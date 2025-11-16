import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Hospedagem({ onVoltar }) {
  const [favoritos, setFavoritos] = useState([]);
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(5);

  const hospedagens = [
    { id: 1, nome: 'Hotel 1', descricao: 'Maior centro de artes figurativas das Américas' },
    { id: 2, nome: 'Hotel 2', descricao: 'Uma das maiores feiras livres do mundo' },
    { id: 3, nome: 'Hotel 3', descricao: 'Local de grandes eventos e festas' },
    { id: 4, nome: 'Hotel 4', descricao: 'Museu de arte popular e cerâmica' },
    { id: 5, nome: 'Hotel 5', descricao: 'Hospedagem confortável e moderna' },
    { id: 6, nome: 'Hotel 6', descricao: 'Localização privilegiada no centro' },
    { id: 7, nome: 'Hotel 7', descricao: 'Ideal para famílias e casais' },
    { id: 8, nome: 'Hotel 8', descricao: 'Ambiente sofisticado e elegante' },
    { id: 9, nome: 'Hotel 9', descricao: 'Hotel econômico e bem avaliado' },
    { id: 10, nome: 'Hotel 10', descricao: 'Perfeito para viagens rápidas' },
  ];

  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const carregarMais = () => {
    setQuantidadeVisivel(q => q + 5);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Hospedagem</Text>

        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar hospedagens..."
            placeholderTextColor="#555"
            style={styles.input}
          />
        </View>
      </View>

      {/* LISTA */}
      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        
        {hospedagens.slice(0, quantidadeVisivel).map(hospedagem => (
          <View key={hospedagem.id} style={styles.cardPonto}>
            
            <View style={styles.imagemPlaceholder}>
              <Ionicons name="location" size={40} color="#FB8837" />
            </View>

            <View style={styles.infoPonto}>
              <Text style={styles.nomePonto}>{hospedagem.nome}</Text>
              <Text style={styles.descricaoPonto}>{hospedagem.descricao}</Text>
            </View>

            {/* Favorito */}
            <TouchableOpacity
              style={styles.botaoFavorito}
              onPress={() => toggleFavorito(hospedagem.id)}
            >
              <Ionicons
                name={favoritos.includes(hospedagem.id) ? "heart" : "heart-outline"}
                size={24}
                color="#FB8837"
              />
            </TouchableOpacity>

          </View>
        ))}

        {/* Botão Veja Mais */}
        {quantidadeVisivel < hospedagens.length && (
          <TouchableOpacity style={styles.botaoVejaMais} onPress={carregarMais}>
            <Text style={styles.textoVejaMais}>Veja mais</Text>
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
    elevation: 3,
  },

  input: { flex: 1, fontStyle: 'italic', color: '#333' },
  searchIcon: { marginRight: 5 },

  listaContainer: { flex: 1, width: '100%' },
  listaConteudo: { padding: 20, paddingBottom: 100 },

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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  infoPonto: { flex: 1 },

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

  botaoFavorito: { padding: 5 },

  botaoVejaMais: {
    backgroundColor: '#FB8837',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
  },

  textoVejaMais: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
