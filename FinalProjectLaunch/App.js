import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServersScreen from './ServersScreen';
import FavoritesScreen from './FavoritesScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scroll}>
      <Image
        style={styles.image}
        source={{ uri: 'https://www.pinclipart.com/picdir/big/35-350973_meteor-clipart-final-fantasy-final-fantasy-14-logo.png' }} // FFXIV Logo
      />
      <Text style={styles.text}>This app was created by Gannon Stephens, using the FFXIV API.</Text>
      <Button
        title="Go To Servers"
        onPress={() => navigation.navigate('Servers')}
      />
      <Button
        title="Go To Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />
    </ScrollView>
  </SafeAreaView>
);

export default function App() {
  const [favorites, setFavorites] = useState([]); // Stores favorites.

  // This function will add and/or remove servers from the user's favorites.
  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
  };
  // Sets up different interfaces for android and ios users.
  return (
    <NavigationContainer>
      {Platform.select({
        ios: (
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Servers">
              {(props) => <ServersScreen {...props} favorites={favorites} updateFavorites={updateFavorites} />}
            </Tab.Screen>
            <Tab.Screen name="Favorites">
              {(props) => <FavoritesScreen {...props} favorites={favorites} updateFavorites={updateFavorites} />}
            </Tab.Screen>
          </Tab.Navigator>
        ),
        android: (
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Servers">
              {(props) => <ServersScreen {...props} favorites={favorites} updateFavorites={updateFavorites} />}
            </Drawer.Screen>
            <Drawer.Screen name="Favorites">
              {(props) => <FavoritesScreen {...props} favorites={favorites} updateFavorites={updateFavorites} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        )
      })}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
});
