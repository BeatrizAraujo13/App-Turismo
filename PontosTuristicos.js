import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { apiServices } from '../services/API';

export default function PontosTuristicos() {
  const navigation = useNavigation();

  const [favoritos, setFavoritos] = useState([]);
  const [quantidade, setQuantidade] = useState(5);
  const [pontosTuristico, setPontos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);
      const response = await apiServices.getPontosTuristicos();
      setPontos(response.data);
    } catch (e) {
      console.log("Erro ao carregar pontos turísticos:", e.message);
    } finally {
      setLoading(false);
    }
  }

  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const listaFiltrada = pontosTuristico.filter(p => {
    if (!p) return false;
    return p.titulo?.toLowerCase().includes(busca.toLowerCase());
  });

  // Abrir Google Maps com coordenadas
  const abrirMapa = (ponto) => {
    if (ponto.latitude && ponto.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${ponto.latitude},${ponto.longitude}`;
      Linking.openURL(url).catch(err => console.error("Erro ao abrir o Google Maps", err));
    }
  };

  // Lista de favoritos completa
  const favoritosCompletos = pontosTuristico.filter(p => favoritos.includes(p.place_id));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FB8837" />
        <Text style={styles.loadingText}>Carregando pontos turísticos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TOPO */}
      <View style={styles.Topo}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Pontos Turísticos</Text>

        <View style={styles.Pesquisar}>
          <TextInput
            placeholder="Buscar pontos turísticos..."
            placeholderTextColor="#555"
            style={styles.input}
            value={busca}
            onChangeText={setBusca}
          />
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        </View>
      </View>

      {/* LISTA DE PONTOS */}
      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        {listaFiltrada.slice(0, quantidade).map((ponto, index) => {
          const titulo = ponto.titulo || `Ponto Turístico ${index + 1}`;
          const endereco = ponto.endereco || 'Endereço não disponível';
          const descricao = ponto.descricao || ponto.description || endereco;

          return (
            <TouchableOpacity
              key={ponto.place_id || ponto.id || index.toString()}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("DetalhesItem", {
                  item: ponto,
                  tipo: "ponto"
                })
              }
            >
              <View style={styles.imagemPlaceholder}>
                <Ionicons name="location" size={40} color="#FB8837" />
                <Text style={styles.numeroCard}>{index + 1}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.nome} numberOfLines={1}>{titulo}</Text>
                <Text style={styles.descricao} numberOfLines={2}>{descricao}</Text>

                {ponto.latitude && ponto.longitude && (
                  <TouchableOpacity onPress={() => abrirMapa(ponto)}>
                    <Text style={[styles.endereco, { textDecorationLine: 'underline', color: '#0066cc' }]} numberOfLines={1}>
                      📍 {endereco}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={styles.botaoFavorito}
                onPress={() => toggleFavorito(ponto.place_id)}
              >
                <Ionicons
                  name={favoritos.includes(ponto.place_id) ? "heart" : "heart-outline"}
                  size={24}
                  color="#FB8837"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}

        {quantidade < listaFiltrada.length && (
          <TouchableOpacity style={styles.botaoMais} onPress={() => setQuantidade(prev => prev + 4)}>
            <Text style={styles.textoMais}>Carregar mais ({listaFiltrada.length - quantidade} restantes)</Text>
          </TouchableOpacity>
        )}

        {listaFiltrada.length === 0 && (
          <View style={styles.semResultados}>
            <Ionicons name="search-outline" size={50} color="#ccc" />
            <Text style={styles.semResultadosTexto}>
              Nenhum ponto turístico encontrado{'\n'}
              {busca ? `para "${busca}"` : ''}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* BARRA INFERIOR */}
      <View style={styles.barra}>
        <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Mapa')}>
          <Ionicons name="map" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoItem}
          onPress={() => navigation.navigate('Favoritos', { pontos: favoritosCompletos })}
        >
          <Ionicons name="heart" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Favoritos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { marginTop: 10, color: '#666' },
  container: { flex: 1, backgroundColor: '#fff' },
  Topo: { width: '100%', backgroundColor: '#FB8837', alignItems: 'center', paddingTop: 50, paddingBottom: 40, borderBottomLeftRadius: 100, borderBottomRightRadius: 100, position: 'relative' },
  Pesquisar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 25, width: '80%', height: 40, paddingHorizontal: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginTop: 15 },
  botaoVoltar: { position: 'absolute', top: 40, left: 20 },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#000', marginTop: 5 },
  searchIcon: { marginLeft: 5 },
  input: { flex: 1, fontStyle: 'italic', color: '#333' },
  listaContainer: { flex: 1, width: '100%' },
  listaConteudo: { padding: 20, paddingBottom: 100 },
  card: { flexDirection: 'row', backgroundColor: '#f8f8f8', borderRadius: 15, padding: 15, marginBottom: 15, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  imagemPlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFE8D6', justifyContent: 'center', alignItems: 'center', marginRight: 15, position: 'relative' },
  numeroCard: { position: 'absolute', fontSize: 12, fontWeight: 'bold', color: '#FB8837' },
  info: { flex: 1 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 3 },
  descricao: { fontSize: 14, color: '#666', marginBottom: 3 },
  endereco: { fontSize: 12, color: '#888', fontStyle: 'italic' },
  botaoFavorito: { padding: 5, marginLeft: 5 },
  botaoMais: { backgroundColor: '#FB8837', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 25, alignSelf: 'center', marginTop: 10 },
  textoMais: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  semResultados: { alignItems: 'center', justifyContent: 'center', padding: 40 },
  semResultadosTexto: { textAlign: 'center', color: '#666', marginTop: 10, fontSize: 16, lineHeight: 24 },
  barra: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FB8837', width: '100%', height: 90, marginTop: 'auto', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  botaoItem: { alignItems: 'center', padding: 10 },
  botaoTextoBarra: { fontSize: 12, color: '#000', marginTop: 3, fontWeight: '500' }
});
