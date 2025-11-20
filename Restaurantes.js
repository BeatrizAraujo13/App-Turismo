import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Restaurantes() {
  const navigation = useNavigation();

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

  const [quantidade, setQuantidade] = useState(5);
  const [favoritos, setFavoritos] = useState([]);

  const restaurantes = listaCompleta.slice(0, quantidade);

  const alternarFavorito = (id) => {
    setFavoritos(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const carregarMais = () => setQuantidade(prev => prev + 5);

  return (
    <View style={styles.container}>
      <View style={styles.Topo}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Comedorias</Text>

        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput placeholder="Pesquisar comedorias..." placeholderTextColor="#555" style={styles.input} />
        </View>
      </View>

      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        {restaurantes.map(r => (
          <View key={r.id} style={styles.card}>
            <View style={styles.imagemPlaceholder}>
              <Ionicons name="location" size={40} color="#FB8837" />
            </View>
            <View style={styles.info}>
              <Text style={styles.nome}>{r.nome}</Text>
              <Text style={styles.descricao}>{r.descricao}</Text>
            </View>
            <TouchableOpacity style={styles.botaoFavorito} onPress={() => alternarFavorito(r.id)}>
              <Ionicons name={favoritos.includes(r.id) ? "heart" : "heart-outline"} size={26} color="#FB8837" />
            </TouchableOpacity>
          </View>
        ))}

        {quantidade < listaCompleta.length && (
          <TouchableOpacity style={styles.botaoMais} onPress={carregarMais}>
            <Text style={styles.textoMais}>Veja mais</Text>
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
    backgroundColor: '#FB8837', 
    paddingTop: 60, 
    paddingBottom: 30, 
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100
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
    elevation: 3 },
  input: { 
    flex: 1, 
    fontStyle: 'italic', 
    color: '#333' 
  },
  searchIcon: { 
    marginRight: 5 
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
    color: '#333', 
    marginBottom: 5 
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
    marginTop: 10 
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