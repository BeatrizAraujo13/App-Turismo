import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PontosTuristicos({ onVoltar }) {
  const [favoritos, setFavoritos] = useState([]);
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(5);

  // Lista completa — você pode substituir pelos dados vindos do backend
  const pontosTuristicos = [
    { id: 1, nome: 'Alto do Moura', descricao: 'Maior centro de artes figurativas das Américas' },
    { id: 2, nome: 'Feira de Caruaru', descricao: 'Uma das maiores feiras livres do mundo' },
    { id: 3, nome: 'Pátio de Eventos', descricao: 'Local de grandes eventos e festas' },
    { id: 4, nome: 'Museu do Barro', descricao: 'Museu de arte popular e cerâmica' },
    { id: 5, nome: 'Monte Bom Jesus', descricao: 'Vista panorâmica da cidade' },
    { id: 6, nome: 'Polo Gastronômico', descricao: 'Região rica em culinária típica' },
    { id: 7, nome: 'Parque Ambiental', descricao: 'Área verde com pista de caminhada' },
    { id: 8, nome: 'Estação Ferroviária', descricao: 'Ponto histórico e cultural' },
    { id: 9, nome: 'Casa do Forró', descricao: 'Museu dedicado ao forró' },
    { id: 10, nome: 'Teatro João Lyra', descricao: 'Espaço de cultura e arte' },
  ];

  // alterna favorito
  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  // carregar mais itens
  const carregarMais = () => {
    setQuantidadeVisivel((q) => q + 5);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
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

      {/* LISTA */}
      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        
        {/* MOSTRAR APENAS X ITENS */}
        {pontosTuristicos.slice(0, quantidadeVisivel).map((ponto) => (
          <View key={ponto.id} style={styles.cardPonto}>
            <View style={styles.imagemPlaceholder}>
              <Ionicons name="location" size={40} color="#FB8837" />
            </View>

            <View style={styles.infoPonto}>
              <Text style={styles.nomePonto}>{ponto.nome}</Text>
              <Text style={styles.descricaoPonto}>{ponto.descricao}</Text>
            </View>

            {/* FAVORITO */}
            <TouchableOpacity
              style={styles.botaoFavorito}
              onPress={() => toggleFavorito(ponto.id)}
            >
              <Ionicons
                name={favoritos.includes(ponto.id) ? "heart" : "heart-outline"}
                size={24}
                color="#FB8837"
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* BOTÃO DE VEJA MAIS */}
        {quantidadeVisivel < pontosTuristicos.length && (
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

  listaContainer: { flex: 1 },
  listaConteudo: { padding: 20, paddingBottom: 100 },

  cardPonto: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
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

