import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Favoritos() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <View style={styles.Topo}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Favoritos</Text>
        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput placeholder="Pesquisar em favoritos..." placeholderTextColor="#555" style={styles.input} />
        </View>
      </View>

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
    backgroundColor: '#fff' 
  },
  titulo: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 20 
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
  },
  Topo: { 
    backgroundColor: '#FB8837', 
    paddingTop: 60, 
    paddingBottom: 30, 
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: 'center' 
  },
  botaoVoltar: { 
    position: 'absolute', 
    top: 40, 
    left: 20 
  },
  titulo: { 
    fontSize: 25, 
    fontWeight: 'bold',
    color: '#000',
    marginTop: 3,
    marginBottom: 10 
  },
  Pesquisar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 25, 
    width: '80%', 
    height: 40, 
    paddingHorizontal: 10, 
    elevation: 3 
  },
  input: { 
    flex: 1, 
    fontStyle: 'italic', 
    color: '#333' 
  },
  searchIcon: { 
    marginRight: 5 
  }
});
