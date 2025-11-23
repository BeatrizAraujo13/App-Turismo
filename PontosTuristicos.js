import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PontosTuristicos() {
  const navigation = useNavigation();

  const pontos = [
    { id: 1, nome: 'Praça Central', descricao: 'Local histórico de Caruaru' },
    { id: 2, nome: 'Museu do Forró', descricao: 'Mostra a cultura musical' },
    { id: 3, nome: 'Parque das Árvores', descricao: 'Espaço verde e lazer' },
    { id: 4, nome: 'Feira de Artesanato', descricao: 'Artesanato regional' },
    { id: 5, nome: 'Igreja Matriz', descricao: 'Construção histórica' },
    { id: 6, nome: 'Teatro Municipal', descricao: 'Espaço cultural' },
    { id: 7, nome: 'Estádio', descricao: 'Eventos esportivos' },
    { id: 8, nome: 'Cachoeira', descricao: 'Turismo ecológico' },
  ];

  const [favoritos, setFavoritos] = useState([]);
  const [quantidade, setQuantidade] = useState(5);

  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const carregarMais = () => {
    setQuantidade(prev => prev + 4);
  };

  return (
    <View style={styles.container}>
      <View style={styles.Topo}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.titulo}>Pontos Turísticos</Text>

        <View style={styles.Pesquisar}>
          <TextInput
              placeholder="O que você procura..."
              placeholderTextColor="#555"
              style={styles.input}
          />
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        </View>       
      </View>

      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        {pontos.slice(0, quantidade).map(ponto => (
          <View key={ponto.id} style={styles.card}>
            <View style={styles.imagemPlaceholder}>
              <Ionicons name="location" size={40} color="#FB8837" />
            </View>
            <View style={styles.info}>
              <Text style={styles.nome}>{ponto.nome}</Text>
              <Text style={styles.descricao}>{ponto.descricao}</Text>
            </View>
            <TouchableOpacity style={styles.botaoFavorito} onPress={() => toggleFavorito(ponto.id)}>
              <Ionicons
                name={favoritos.includes(ponto.id) ? "heart" : "heart-outline"}
                size={24}
                color="#FB8837"
              />
            </TouchableOpacity>
          </View>
        ))}

        {quantidade < pontos.length && (
          <TouchableOpacity style={styles.botaoMais} onPress={carregarMais}>
            <Text style={styles.textoMais}>Ver mais</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
  Topo: {
    width: '100%',
    backgroundColor: '#FB8837',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: 'relative',
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
    marginTop: 15,
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
    marginTop: 5,
  },
  searchIcon: { 
    marginLeft: 5   
  },
  input: { 
    flex: 1, 
    fontStyle: 'italic', 
    color: '#333'
  },
  listaContainer: { 
    flex: 1, 
    width: '100%' 
  },
  listaConteudo: { 
    padding: 20, 
    paddingBottom: 100 
  },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#f8f8f8', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 15, 
    alignItems: 'center', 
    elevation: 3 
  },
  imagemPlaceholder: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  info: { 
    flex: 1 
  },
  nome: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  descricao: { 
    fontSize: 14, 
    color: '#666' 
  },
  botaoFavorito: { 
    padding: 5 
  },
  botaoMais: { 
    backgroundColor: '#FB8837', 
    paddingVertical: 12, 
    paddingHorizontal: 18, 
    borderRadius: 25, 
    alignSelf: 'center', 
  },
  textoMais: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
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