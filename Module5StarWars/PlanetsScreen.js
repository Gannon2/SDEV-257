import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, ActivityIndicator, StyleSheet, TextInput, Button, Modal, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler';
import axios from 'axios';

const PlanetsScreen = ({ navigation }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get('https://www.swapi.tech/api/planets');
        const data = await response.data;
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching Planets: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  const handleSwipe = (planetName) => {
    setSelectedPlanet(planetName);
    setModalVisible(true);
  };

  const renderRightActions = (planetName) => (
    <View style={styles.swipeContainer}>
      <Text style={styles.swipeText}>Swipe!</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.name)}
      onSwipeableRightOpen={() => handleSwipe(item.name)}
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </Swipeable>
  );

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

      <TextInput
        style={styles.input}
        placeholder="Enter search term"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Submit" onPress={() => {}} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You selected: {selectedPlanet}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={planets}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 10,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%',
  },
  itemText: {
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6347',
    width: 75,
  },
  swipeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PlanetsScreen;
