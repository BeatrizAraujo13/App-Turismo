import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Mapa() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mapa</Text>
      <Text style={styles.texto}>Aqui estará o mapa com todos os pontos e restaurantes.</Text>

      <View style={styles.barra}>
              <TouchableOpacity
                style={styles.botaoItem}
                onPress={() => navigation.navigate('Home')}
              >
                <Ionicons name="home" size={24} color="#000" />
                <Text style={styles.botaoTextoBarra}>Início</Text>
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.botaoItem}
                onPress={() => navigation.navigate('Mapa')}
              >
                <Ionicons name="map" size={24} color="#000" />
                <Text style={styles.botaoTextoBarra}>Mapa</Text>
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.botaoItem}
                onPress={() => navigation.navigate('Favoritos')}
              >
                <Ionicons name="heart" size={24} color="#000" />
                <Text style={styles.botaoTextoBarra}>Favoritos</Text>
              </TouchableOpacity>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  titulo: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 20 
  },
  texto: { 
    fontSize: 18, 
    color: '#333', 
    textAlign: 'center', 
    paddingHorizontal: 20 
  },
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FB8837',
    width: '100%',
    height: 90,
    marginTop: 'auto',
  },
  botaoItem: { 
    alignItems: 'center' 
  },
  botaoTextoBarra: { 
    fontSize: 12, 
    color: '#000', 
    marginTop: 3 
  }
});