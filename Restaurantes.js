import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Restaurantes({ onVoltar }) {

  // Lista completa (exemplo estático)
  const listaCompleta = [
    { id: 1, nome: 'Restaurante 1', descricao: 'Restaurante de comida regional' },
    { id: 2, nome: 'Restaurante 2', descricao: 'Restaurante de comida internacional' },
    { id: 3, nome: 'Restaurante 3', descricao: 'Restaurante de comida vegana' },
    { id: 4, nome: 'Restaurante 4', descricao: 'Restaurante de comida italiana' },
    { id: 5, nome: 'Restaurante 5', descricao: 'Restaurante de comida mexicana' },
    { id: 6, nome: 'Restaurante 6', descricao: 'Restaurante de comida japonesa' },
    { id: 7, nome: 'Restaurante 7', descricao: 'Restaurante de comida árabe' },
    { id: 8, nome: 'Restaurante 8', descricao: 'Restaurante saudável' },
    { id: 9, nome: 'Restaurante 9', descricao: 'Restaurante nordestino' },
    { id: 10, nome: 'Restaurante 10', descricao: 'Restaurante rápido' },
  ];

  // Quantidade exibida
  const [quantidade, setQuantidade] = useState(5);

  // Favoritos (guardamos apenas IDs)
  const [favoritos, setFavoritos] = useState([]);

  const restaurantes = listaCompleta.slice(0, quantidade);

  // Função que adiciona/remove favorito
  const alternarFavorito = (id) => {
    if (favoritos.includes(id)) {
      // remover
      setFavoritos(favoritos.filter(item => item !== id));
    } else {
      // adicionar
      setFavoritos([...favoritos, id]);
    }
  };

  const carregarMais = () => {
    setQuantidade(prev => prev + 5);
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Comedorias</Text>

        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar comedorias..."
            placeholderTextColor="#555"
            style={styles.input}
          />
        </View>
      </View>

      {/* LISTA */}
      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        {restaurantes.map((restaurante) => (
          <View key={restaurante.id} style={styles.cardPonto}>

            <View style={styles.imagemPlaceholder}>
              <Ionicons name="location" size={40} color="#FB8837" />
            </View>

            <View style={styles.infoPonto}>
              <Text style={styles.nomePonto}>{restaurante.nome}</Text>
              <Text style={styles.descricaoPonto}>{restaurante.descricao}</Text>
            </View>

            {/* BOTÃO FAVORITO */}
            <TouchableOpacity
              style={styles.botaoFavorito}
              onPress={() => alternarFavorito(restaurante.id)}
            >
              <Ionicons
                name={favoritos.includes(restaurante.id) ? "heart" : "heart-outline"}
                size={26}
                color="#FB8837"
              />
            </TouchableOpacity>

          </View>
        ))}

        {/* BOTÃO CARREGAR MAIS */}
        {quantidade < listaCompleta.length && (
          <TouchableOpacity style={styles.botaoCarregar} onPress={carregarMais}>
            <Text style={styles.textoCarregar}>Veja mais</Text>
          </TouchableOpacity>
        )}
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

  botaoCarregar: {
     backgroundColor: '#FB8837',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  textoCarregar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});