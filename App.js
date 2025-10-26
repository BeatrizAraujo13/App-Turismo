import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ícones do Expo

export default function App() {
  return (
    <View style={styles.container}>
      {/* TOPO */}
      <View style={styles.headerContainer}>
        <Text style={styles.titulo}>VIVA CARUARU</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="O que você procura..."
            placeholderTextColor="#555"
            style={styles.input}
          />
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        </View>

        <View style={styles.curve} />
      </View>

      {/* BOTÕES */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>Pontos Turísticos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao]}>
          <Text style={styles.botaoTexto}>    Restaurantes   </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao]}>
          <Text style={styles.botaoTexto}>   Hospedagem   </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>       Eventos       </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTAINER PRINCIPAL
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  // CABEÇALHO
  headerContainer: {
    width: '100%',
    backgroundColor: '#FB8837',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 70,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    position: 'relative',
  },

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  input: {
    flex: 1,
    fontStyle: 'italic',
    color: '#333',
  },

  searchIcon: {
    marginLeft: 5,
  },

  curve: {
    position: 'absolute',
    bottom: -60,
    backgroundColor: '#FB8837',
    width: '130%',
    height: 120,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    zIndex: -1,
  },

  // BOTÕES
  buttonsContainer: {
    marginTop: 80,
    alignItems: 'center',
    width: '100%',
  },

  botao: {
    backgroundColor: '#FB8837',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginBottom: 25,
  },

  botaoTexto: {
    color: '#191717',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

