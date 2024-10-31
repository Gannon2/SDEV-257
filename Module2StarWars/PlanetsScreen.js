import * as React from 'react';
import { Text, SafeAreaView, FlatList, Button, StyleSheet } from 'react-native';

const PlanetsScreen = ({navigation}) => {
  const teams = ['Placeholder', 'Placeholder', 'Placeholder'];
   return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Planets</Text>
      <FlatList
        data={teams}
        renderItem={({ item }) => <Text style={styles.team}>{item}</Text>}
        keyExtractor={(item) => item}
      />


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  team: {
    fontSize: 18,
    marginBottom: 10
  },
});

export default PlanetsScreen;
