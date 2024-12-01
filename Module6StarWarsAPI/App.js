import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Button, StyleSheet, Platform, ScrollView, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import PlanetsScreen from './PlanetsScreen';
import SpaceshipsScreen from './SpaceshipsScreen';
import FilmsScreen from './FilmsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scroll}>
      <Image
        style={styles.image}
        source={{ uri: 'https://logos-world.net/wp-content/uploads/2020/11/Star-Wars-Logo-1977.png' }} // Star Wars Logo
      />
      <Text style={styles.text}>This app was created by Gannon Stephens</Text>
      <Button
        title="Go To Planets"
        onPress={() => navigation.navigate('Planets')}
      />
      <Button
        title="Go To Spaceships"
        onPress={() => navigation.navigate('Spaceships')}
      />
      <Button
        title="Go To Films"
        onPress={() => navigation.navigate('Films')}
      />
    </ScrollView>
  </SafeAreaView>
);

export default function App() {
  const [isConnected, setIsConnected] = useState(true); // Tracks the users connectivity.

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {isConnected ? (
          Platform.select({
            ios: (
              <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Planets" component={PlanetsScreen} />
                <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
                <Tab.Screen name="Films" component={FilmsScreen} />
              </Tab.Navigator>
            ),
            android: (
              <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Planets" component={PlanetsScreen} />
                <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
                <Drawer.Screen name="Films" component={FilmsScreen} />
              </Drawer.Navigator>
            )
          })
        ) : (
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No internet connection. Please check your network settings.</Text>
          </View>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
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
    resizeMode: 'cover',
    marginBottom: 16,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
  },
  offlineText: {
    fontSize: 18,
    color: '#721c24',
    textAlign: 'center',
    marginHorizontal: 16,
  },
});
