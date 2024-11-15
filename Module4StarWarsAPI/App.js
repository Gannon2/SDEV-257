import React, {useEffect, useState} from 'react';
import { Text, SafeAreaView, Button, StyleSheet, Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import axios from 'axios';
import PlanetsScreen from './PlanetsScreen';
import SpaceshipsScreen from './SpaceshipsScreen';
import FilmsScreen from './FilmsScreen';



const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => (
  <SafeAreaView>
  <Text> This app was created by Gannon Stephens</Text>
  <Button title="Go To Planets" onPress={() => navigation.navigate('Planets')} />
  <Button title="Go To Spaceships" onPress={() => navigation.navigate('Spaceships')} />
  <Button title="Go To Films" onPress={() => navigation.navigate('Films')} />

  </SafeAreaView>
);




export default function App() {

  return (
    <NavigationContainer>
      {Platform.select({
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
      })}
    </NavigationContainer>
  );
}