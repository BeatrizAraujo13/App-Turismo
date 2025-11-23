import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Eventos() {
  const navigation = useNavigation();

  const eventos = [
    { id: 1, nome: 'Festival de Inverno', descricao: 'Maior festival de inverno do Brasil' },
    { id: 2, nome: 'São João de Caruaru', descricao: 'Uma das maiores festas juninas do mundo' },
    { id: 3, nome: 'Festa do Vaqueiro', descricao: 'Celebração da cultura nordestina' },
    { id: 4, nome: 'Exposição de Artesanato', descricao: 'Mostra do melhor do artesanato local' },
    { id: 5, nome: 'Feira Gastronômica', descricao: 'Sabores regionais e novas experiências' },
    { id: 6, nome: 'Mostra de Cinema', descricao: 'Cinema independente e local' },
    { id: 7, nome: 'Semana Cultural', descricao: 'Atividades artísticas para todas as idades' },
    { id: 8, nome: 'Encontro de Motociclistas', descricao: 'Evento anual com shows e atrações' },
  ];

  const [favoritos, setFavoritos] = useState([]);
  const [quantidade, setQuantidade] = useState(5);

  const toggleFavorito = (id) => {
    setFavoritos(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const carregarMais = () => setQuantidade(prev => prev + 4);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Eventos</Text>

        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput placeholder="Pesquisar eventos..." placeholderTextColor="#555" style={styles.input} />
        </View>
      </View>

      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        {eventos.slice(0, quantidade).map(evento => (
          <View key={evento.id} style={styles.card}>
            <View style={styles.imagemPlaceholder}>
              <Ionicons name="location" size={40} color="#FB8837" />
            </View>
            <View style={styles.info}>
              <Text style={styles.nome}>{evento.nome}</Text>
              <Text style={styles.descricao}>{evento.descricao}</Text>
            </View>
            <TouchableOpacity style={styles.botaoFavorito} onPress={() => toggleFavorito(evento.id)}>
              <Ionicons name={favoritos.includes(evento.id) ? "heart" : "heart-outline"} size={24} color="#FB8837" />
            </TouchableOpacity>
          </View>
        ))}

        {quantidade < eventos.length && (
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
  header: { 
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
    marginBottom: 10, 
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
  },
  listaContainer: { 
    flex: 1, 
    width: '100%' 
  },
  listaConteudo: { 
    padding: 20, 
    paddingBottom: 120 
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
     marginTop: 10 },
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