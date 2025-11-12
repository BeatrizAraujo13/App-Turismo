import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PontosTuristicos({ onVoltar }) {
  const pontosTuristicos = [
    { id: 1, nome: 'Alto do Moura', descricao: 'Maior centro de artes figurativas das Américas' },
    { id: 2, nome: 'Feira de Caruaru', descricao: 'Uma das maiores feiras livres do mundo' },
    { id: 3, nome: 'Pátio de Eventos', descricao: 'Local de grandes eventos e festas' },
    { id: 4, nome: 'Museu do Barro', descricao: 'Museu de arte popular e cerâmica' },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER ESPECÍFICO DOS PONTOS TURÍSTICOS */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.titulo}>Pontos Turísticos</Text>
        
        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar pontos turísticos..."
            placeholderTextColor="#555"
            style={styles.input}
          />
        </View>
      </View>

      {/* LISTA DE PONTOS TURÍSTICOS */}
      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        {pontosTuristicos.map((ponto) => (
          <View key={ponto.id} style={styles.cardPonto}>
            <View style={styles.imagemPlaceholder}>
              <Ionicons name="location" size={40} color="#FB8837" />
            </View>
            <View style={styles.infoPonto}>
              <Text style={styles.nomePonto}>{ponto.nome}</Text>
              <Text style={styles.descricaoPonto}>{ponto.descricao}</Text>
            </View>
            <TouchableOpacity style={styles.botaoFavorito}>
              <Ionicons name="heart-outline" size={24} color="#FB8837" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FB8837',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  Pesquisar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
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
    marginRight: 5,
  },
  listaContainer: {
    flex: 1,
    width: '100%',
  },
  listaConteudo: {
    padding: 20,
    paddingBottom: 100,
  },
  cardPonto: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagemPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoPonto: {
    flex: 1,
  },
  nomePonto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  descricaoPonto: {
    fontSize: 14,
    color: '#666',
  },
  botaoFavorito: {
    padding: 5,
  },
});
