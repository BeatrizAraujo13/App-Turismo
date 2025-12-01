import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Mapa({ route }) {
  const navigation = useNavigation();
  const { latitude, longitude } = route.params || {};

  const defaultCoords = {
    latitude: -8.284550,
    longitude: -35.969920,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const region = latitude && longitude
    ? {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : defaultCoords;

  return (
    <View style={styles.container}>

      {/* Seta de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <MapView style={styles.map} initialRegion={region}>
        {latitude && longitude ? (
          <Marker coordinate={{ latitude, longitude }} title="Local selecionado" />
        ) : (
          <Marker 
            coordinate={{ latitude: defaultCoords.latitude, longitude: defaultCoords.longitude }}
            title="Caruaru - PE"
          />
        )}
      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 999,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 50,
    elevation: 5,
  },
});
