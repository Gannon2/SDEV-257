import React, { useEffect, useState } from 'react';
import {Text, SafeAreaView, ActivityIndicator, StyleSheet, TextInput, View, Image,
} from 'react-native';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import axios from 'axios';

const ServersScreen = ({ favorites, updateFavorites }) => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // fetches the API from the link.
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.get('https://xivapi.com/servers');
        setServers(response.data);
      } catch (error) {
        console.error('Error fetching servers: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServers();
  }, []);
  // controls the favorite servers that the user controls.
  const handleAddToFavorites = (serverName) => {
    if (!favorites.includes(serverName)) {
      updateFavorites([...favorites, serverName]);
    }
  };

  const renderRightActions = (serverName) => (
    <View style={styles.swipeContainer}>
      <Text style={styles.swipeText}>Favorited!</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item)}
      onSwipeableRightOpen={() => handleAddToFavorites(item)}
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    </Swipeable>
  );
  // Updated the search function so it is no longer cosmetic.
  const filteredServers = servers.filter((server) =>
    server.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Servers...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://www.pinclipart.com/picdir/big/35-350973_meteor-clipart-final-fantasy-final-fantasy-14-logo.png',
        }} // FFXIV Logo
      />
      <Text style={styles.title}>Servers</Text>

      <TextInput
        style={styles.input}
        placeholder="Search for a server"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredServers}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
});

export default ServersScreen;
