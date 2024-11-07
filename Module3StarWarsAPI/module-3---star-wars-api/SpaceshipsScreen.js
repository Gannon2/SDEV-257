import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const SpaceshipsScreen = ({ navigation }) => {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
// Uses the API instead of a hard-coded flatlist.
  useEffect(() => {
    const fetchSpaceships = async () => {
      try {
        const response = await axios.get("https://www.swapi.tech/api/starships");
        const data = await response.data;
        setSpaceships(data.results);
      } catch (error) {
        console.error("Error fetching Spaceships: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpaceships();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Spaceships...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Spaceships</Text>
      <FlatList
        data={spaceships}
        renderItem={({ item }) => <Text style={styles.team}>{item.name}</Text>}
        keyExtractor={(item) => item.uid}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpaceshipsScreen;
