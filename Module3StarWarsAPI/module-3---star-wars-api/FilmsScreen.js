import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const FilmsScreen = ({ navigation }) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
// Uses the API instead of a hard-coded flatlist.
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("https://www.swapi.tech/api/films");
        const data = await response.data;
        setFilms(data.results);
      } catch (error) {
        console.error("Error fetching Films: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Films...</Text>
      </SafeAreaView>
    );
  }

 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Films</Text>
      <FlatList
        data={films}
        renderItem={({ item }) => (
          <Text style={styles.team}>{item.properties.title}</Text>
        )}
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

export default FilmsScreen;
