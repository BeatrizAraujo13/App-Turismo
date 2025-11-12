import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapaSimples() {
  const [marcadores, setMarcadores] = useState([]);

  // Adiciona marcador ao tocar
  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const novoMarcador = {
      id: Date.now(),
      latitude,
      longitude,
    };
    setMarcadores([...marcadores, novoMarcador]);
  };

  // Abre o Google Maps com base no último marcador
  const abrirNoGoogleMaps = () => {
    if (marcadores.length === 0) {
      Alert.alert('Aviso', 'Toque no mapa para adicionar um marcador primeiro!');
      return;
    }

    const ultimo = marcadores[marcadores.length - 1];
    const url = `https://www.google.com/maps?q=${ultimo.latitude},${ultimo.longitude}`;

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -8.2822,
          longitude: -35.9734,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handlePress}
      >
        {marcadores.map((marcador) => (
          <Marker
            key={marcador.id}
            coordinate={{
              latitude: marcador.latitude,
              longitude: marcador.longitude,
            }}
            pinColor="red"
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.botao} onPress={abrirNoGoogleMaps}>
        <Text style={styles.botaoTexto}>Abrir no Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '90%',
  },
  botao: {
    backgroundColor: '#FB8837',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    margin: 10,
  },
  botaoTexto: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});