import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Favoritos({ onVoltar }) {
  
  const favoritosLista = [
    { id: 1, nome: 'Hotel 1', descricao: 'Descrição do Hotel 1' },
    { id: 2, nome: 'São João de Caruaru', descricao: 'Uma das maiores festas juninas do mundo' },
    { id: 3, nome: 'Restaurante 1', descricao: 'Descrição do Restaurante 1' },
    { id: 4, nome: 'Feira de Caruaru', descricao: 'Mostra do melhor do artesanato local' },
    { id: 5, nome: 'Ponto X', descricao: 'Descrição exemplo' },
    { id: 6, nome: 'Evento Y', descricao: 'Descrição exemplo 2' },
    { id: 7, nome: 'Hotel 2', descricao: 'Mais um hotel da cidade' },
    { id: 8, nome: 'Restaurante 2', descricao: 'Comida regional' },
  ];

  const [quantidadeExibida, setQuantidadeExibida] = useState(4);

  function carregarMais() {
    setQuantidadeExibida(prev => prev + 4);
  }

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.titulo}>Favoritos</Text>
        
        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar favoritos..."
            placeholderTextColor="#555"
            style={styles.input}
          />
        </View>
      </View>

      {/* LISTA */}
      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        
        {favoritosLista.slice(0, quantidadeExibida).map((favorito) => (
          <View key={favorito.id} style={styles.cardPonto}>
            
            <View style={styles.imagemPlaceholder}>
              <Ionicons name="location" size={40} color="#FB8837" />
            </View>

            <View style={styles.infoPonto}>
              <Text style={styles.nomePonto}>{favorito.nome}</Text>
              <Text style={styles.descricaoPonto}>{favorito.descricao}</Text>
            </View>

            <TouchableOpacity style={styles.botaoFavorito}>
              <Ionicons name="heart" size={24} color="#FB8837" />
            </TouchableOpacity>

          </View>
        ))}

        {/* BOTÃO VER MAIS */}
        {quantidadeExibida < favoritosLista.length && (
          <TouchableOpacity style={styles.botaoVejaMais} onPress={carregarMais}>
            <Text style={styles.vejaMaisTexto}>Ver mais</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#FB8837',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },

  botaoVoltar: { position: 'absolute', top: 40, left: 20, zIndex: 1 },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#000', marginBottom: 15 },

  Pesquisar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    elevation: 3,
  },

  input: { flex: 1, fontStyle: 'italic', color: '#333' },
  searchIcon: { marginRight: 5 },

  listaContainer: { flex: 1, width: '100%' },
  listaConteudo: { padding: 20, paddingBottom: 120 },

  cardPonto: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },

  imagemPlaceholder: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
    marginRight: 15,
  },

  infoPonto: { flex: 1 },
  nomePonto: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  descricaoPonto: { fontSize: 14, color: '#666' },

  botaoFavorito: { padding: 5 },

  botaoVejaMais: {
    backgroundColor: '#FB8837',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },

  vejaMaisTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
