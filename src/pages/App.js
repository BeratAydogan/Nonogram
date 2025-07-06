import React from 'react';
import { SafeAreaView } from 'react-native';
import Grid from '../pages/components/Grid/Grid'; // doğru import

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1,justifyContent:'center',alignContent:'center',alignItems:'center' }}>
      <Grid />
    </SafeAreaView>
  );
}
