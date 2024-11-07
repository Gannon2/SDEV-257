import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const PlanetsScreen = ({ navigation }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
// Uses the API instead of a hard-coded flatlist.
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get("https://www.swapi.tech/api/planets");
        const data = await response.data;
        setPlanets(data.results);
      } catch (error) {
        console.error("Error fetching Planets: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Planets...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Planets</Text>
      <FlatList
        data={planets}
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

export default PlanetsScreen;
