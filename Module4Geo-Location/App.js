import { useState, useEffect } from "react";
import { Text, View, StatusBar } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import styles from "./styles";
import MapView from "react-native-maps";

const URL = "https://nominatim.openstreetmap.org/reverse?lat=";

function formatAddress(address) {
  const { shop, house_number, road, neighborhood, suburb, county, city, state, iso, postcode, country, countryCode } = address;
  return [house_number, road, neighborhood, suburb, city, state, postcode, country].filter(Boolean).join(', ');
}

StatusBar.setBarStyle("dark-content");

export default function WhereAmI() {
  const [address, setAddress] = useState("loading...");
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  // Adds the markers from the textbook.
  const markers = [
    {
      title: "Duff Brewery",
      description: "Duff beer for me, Duff beer for you",
      coordinate: {
        latitude: 43.8418728,
        longitude: -79.086082,
      },
    },
    {
      title: "Pawtucket Brewery",
      description: "New! Patriot Light!",
      coordinate: {
        latitude: 43.8401328,
        longitude: -79.085407,
      },
    },
  ];

  useEffect(() => {
    function setPosition({ coords: { latitude, longitude } }) {
      setLongitude(longitude);
      setLatitude(latitude);

      // Fetches the latitude and longitude.
      fetch(`${URL}${latitude}&lon=${longitude}&format=json`) 
        .then((resp) => resp.json())
        .then(({ address }) => {
          if (address) {
            setAddress(formatAddress(address));
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    let watcher;


      // Asks user for permission to use their location.
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setAddress("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition(location);

      watcher = await Location.watchPositionAsync(
        { accuracy: Location.LocationAccuracy.Highest },
        setPosition
      );
    })();

    return () => {
      watcher?.remove();
    };
  }, []);

  if (!latitude || !longitude) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        showsPointsOfInterest={false}
        showsUserLocation
        followUserLocation
      />
      <Text style={styles.label}>Address: {address}</Text>
      <Text style={styles.label}>Latitude: {latitude}</Text>
      <Text style={styles.label}>Longitude: {longitude}</Text>
    </View>
  );
}
