import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const Tile = ({ status, onPress }) => {
  let backgroundColor = '#ccc'; // boş hücre

  if (status === "correct") backgroundColor = 'green';
  else if (status === "wrong") backgroundColor = 'red';

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.tile, { backgroundColor }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 30,
    height: 30,
    margin: 1,
    borderWidth: 1,
    borderColor: '#999',
  },
});

export default Tile;
