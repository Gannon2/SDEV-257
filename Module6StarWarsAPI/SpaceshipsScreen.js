import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, ActivityIndicator, StyleSheet, TextInput, Button, Modal, View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler';
import axios from 'axios';

const SpaceshipsScreen = ({ navigation }) => {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpaceship, setSelectedSpaceship] = useState('');

  useEffect(() => {
    const fetchSpaceships = async () => {
      try {
        const response = await axios.get('https://www.swapi.tech/api/starships');
        const data = await response.data;
        setSpaceships(data.results);
      } catch (error) {
        console.error('Error fetching Spaceships: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpaceships();
  }, []);

  const handleSwipe = (spaceshipName) => {
    setSelectedSpaceship(spaceshipName);
    setModalVisible(true);
  };

  const renderRightActions = (spaceshipName) => (
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
        <Text>Loading Spaceships...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: 'https://logos-world.net/wp-content/uploads/2020/11/Star-Wars-Logo-1977.png' }} // Star Wars Logo
      />
      <Text style={styles.title}>Spaceships</Text>

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
            <Text style={styles.modalText}>You selected: {selectedSpaceship}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={spaceships}
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
});

export default SpaceshipsScreen;
