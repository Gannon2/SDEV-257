import React from 'react';
import { SafeAreaView, Text, FlatList, View, StyleSheet, Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const FavoritesScreen = ({ favorites, updateFavorites }) => {
  
  // This function removes servers from the user's favorites.
  const handleRemoveFromFavorites = (serverName) => {
    updateFavorites(favorites.filter(item => item !== serverName)); // Removes server from favorites.
  };

  // Renders swipeable action to remove from favorites.
  const renderRightActions = (serverName) => (
    <View style={styles.swipeContainer}>
      <Text style={styles.swipeText}>Removed</Text>
    </View>
  );

  // Renders each favorite server.
  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item)}
      onSwipeableRightOpen={() => handleRemoveFromFavorites(item)} // Triggers removal when the user swipes right.
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://www.pinclipart.com/picdir/big/35-350973_meteor-clipart-final-fantasy-final-fantasy-14-logo.png',
        }} // FFXIV Logo
      />
      <Text style={styles.title}>Your Favorites</Text>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorites selected yet!</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '100%',
  },
  itemText: {
    fontSize: 18,
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
  noFavorites: {
    fontSize: 16,
    color: '#999',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
});

export default FavoritesScreen;
