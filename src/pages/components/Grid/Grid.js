import React, { useState, useEffect,useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Tile from '../Tile/Tile';

function countBlocks(line) {
  const blocks = [];
  let count = 0;

  line.forEach(cell => {
    if (cell) count++;
    else if (count > 0) {
      blocks.push(count);
      count = 0;
    }
  });

  if (count > 0) blocks.push(count);

  return blocks.length > 0 ? blocks : [0];
}

const Grid = () => {
  const gridSize = 10;

  const [answerMatrix, setAnswerMatrix] = useState([]);
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    const newAnswerMatrix = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => Math.random() < 0.5)
    
    );
    console.log(countBlocks([true, true, false, true, false, true, true, true]));

    setAnswerMatrix(newAnswerMatrix);

    const emptyMatrix = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(false)
    );
    setMatrix(emptyMatrix);
  }, []);

  // Satır ve sütun ipuçlarını hesapla
const rowHints = useMemo(() => {
  if (answerMatrix.length === 0) return [];
  return answerMatrix.map(row => countBlocks(row));
}, [answerMatrix]);

const colHints = useMemo(() => {
  if (answerMatrix.length === 0) return [];
  const cols = [];
  for (let col = 0; col < gridSize; col++) {
    const colArray = [];
    for (let row = 0; row < gridSize; row++) {
      colArray.push(answerMatrix[row][col]);
    }
    const blocks = countBlocks(colArray);
  cols.push(blocks);
  console.log(`Col ${col} array:`, colArray, 'blocks:', blocks);
  }
  return cols;
}, [answerMatrix]);

  const handlePress = (row, col) => {
    setMatrix(prev => {
      const newMatrix = prev.map(r => [...r]);
      if (answerMatrix[row][col] === true) {
        newMatrix[row][col] = "correct";
      } else {
        newMatrix[row][col] = "wrong";
      }
      return newMatrix;
    });
  };

  return (
    <View style={styles.container}>
      {/* Sütun ipuçları */}
      <View style={styles.topHintsRow}>
        <View style={styles.corner} /> {/* Sol üst köşe boş */}
        {colHints.map((hintArr, i) => (
          <View key={i} style={styles.topHintCell}>
            {/* Sütun ipuçlarını dikey diz */}
            {hintArr.map((num, idx) => (
              <Text key={idx} style={styles.hintText}>{num}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Satırlar + satır ipuçları */}
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {/* Satır ipuçlarını yatay diz */}
          <View style={styles.sideHintCell}>
            <View style={{ flexDirection: 'row' }}>
              {rowHints[rowIndex].map((num, idx) => (
                <Text key={idx} style={styles.hintText}>{num}</Text>
              ))}
            </View>
          </View>

          {/* Hücreler */}
          {row.map((cell, colIndex) => (
            <Tile
              key={colIndex}
              status={cell}
              onPress={() => handlePress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  topHintsRow: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
  },
  corner: {
    width: 40,
  },
  topHintCell: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideHintCell: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 5,
  },
  hintText: {
    fontSize: 12,
    lineHeight: 16,
    marginRight: 4, // rakamlar arası yatay boşluk
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
  },
});

export default Grid;
