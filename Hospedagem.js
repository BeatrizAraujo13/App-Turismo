import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { listarHospedagem } from "../services/API";

export default function Hospedagem() {
  const [hospedagem, setHospedagem] = useState([]);
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState([]);
  const [quantidade, setQuantidade] = useState(5);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  // PUXAR HOSPEDAGENS DO SERVIDOR
  async function carregar() {
    try {
      const dados = await listarHospedagem();
      setHospedagem(dados);
    } catch (e) {
      console.log("Erro ao carregar hospedagem:", e);
    }
  }

  // MARCAR / DESMARCAR FAVORITO
  const toggleFavorito = (id) => {
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // FILTRO DE BUSCA
  const listaFiltrada = hospedagem.filter(h =>
    h.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const carregarMais = () => setQuantidade(prev => prev + 5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Hospedagem</Text>

        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput 
            placeholder="Pesquisar hospedagens..."
            placeholderTextColor="#555"
            style={styles.input}
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        {listaFiltrada.slice(0, quantidade).map(h => (
          <TouchableOpacity
            key={h.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("DetalhesItem", {
                item: h,
                tipo: "hospedagem"
              })
            }
          >
            <View style={styles.imagemPlaceholder}>
              <Ionicons name="bed" size={40} color="#FB8837" />
            </View>

            <View style={styles.info}>
              <Text style={styles.nome}>{h.nome}</Text>
              <Text style={styles.descricao}>{h.descricao}</Text>
            </View>

            <TouchableOpacity style={styles.botaoFavorito} onPress={() => toggleFavorito(h.id)}>
              <Ionicons
                name={favoritos.includes(h.id) ? "heart" : "heart-outline"}
                size={24}
                color="#FB8837"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {quantidade < listaFiltrada.length && (
          <TouchableOpacity style={styles.botaoMais} onPress={carregarMais}>
            <Text style={styles.textoMais}>Ver mais</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.barra}>
        <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Mapa')}>
          <Ionicons name="map" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Favoritos')}>
          <Ionicons name="heart" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Favoritos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#FB8837',
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: 'center'
  },
  botaoVoltar: { position: 'absolute', top: 40, left: 20 },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#000', marginTop: 3, marginBottom: 10 },
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
  input: { flex: 1, fontStyle: 'italic', color: '#333' },
  searchIcon: { marginRight: 5 },
  listaContainer: { flex: 1, width: '100%' },
  listaConteudo: { padding: 20, paddingBottom: 100 },
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
  info: { flex: 1 },
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
  botaoFavorito: { padding: 5 },
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