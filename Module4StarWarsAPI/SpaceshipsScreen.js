import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, ActivityIndicator, StyleSheet, TextInput, Button, Modal, View } from 'react-native';
import axios from 'axios';

const SpaceshipsScreen = ({ navigation }) => {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState('');

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

  const handleSearchSubmit = () => {
    setSubmittedText(searchTerm);
    setModalVisible(true);
  };

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
      
      <TextInput
        style={styles.input}
        placeholder="Enter search term"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Submit" onPress={handleSearchSubmit} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You entered: {submittedText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
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

export default SpaceshipsScreen;
