import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { apiServices } from "../services/API";

export default function Hospedagem() {
  const [hospedagem, setHospedagem] = useState([]);
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState([]);
  const [quantidade, setQuantidade] = useState(5);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);

      let dados = null;

      // listarHospedagem 
      if (apiServices && typeof apiServices.listarHospedagem === 'function') {
        const res = await apiServices.listarHospedagem();
        dados = res?.data ?? res;
      }

      else if (apiServices && typeof apiServices.getHospedagem === 'function') {
        const res = await apiServices.getHospedagem();
        dados = res?.data ?? res;
      }
      else {
        const URL = 'https://guiacaruaruapi.onrender.com/mapa/pins?tipo=lodging';
        const res = await axios.get(URL, { timeout: 8000 });
        dados = res?.data ?? res;
      }

      // Garantir array
      if (!Array.isArray(dados)) {
        console.warn('Resposta de hospedagem não é array, recebida:', dados);
        setHospedagem([]);
      } else {
        setHospedagem(dados);
      }
    } catch (e) {
      console.log("Erro ao carregar hospedagem:", e?.message ?? e);
    } finally {
      setLoading(false);
    }
  }

  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const listaFiltrada = hospedagem.filter(h => {
    if (!h) return false;
    const texto = (h.nome || h.titulo || '').toLowerCase();
    return texto.includes(busca.toLowerCase());
  });

  const abrirMapa = (hotel) => {
    if (hotel.latitude != null && hotel.longitude != null) {
      const url = `https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`;
      Linking.openURL(url).catch(err => console.log("Erro ao abrir mapas:", err));
    } else if (hotel.endereco) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.endereco)}`;
      Linking.openURL(url).catch(err => console.log("Erro ao abrir mapas:", err));
    }
  };

  const carregarMais = () => setQuantidade(prev => prev + 5);

  const favoritosCompletos = hospedagem.filter(h => favoritos.includes(h.id || h.place_id));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FB8837" />
        <Text style={styles.loadingText}>Carregando hospedagens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TOPO */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Hospedagem</Text>

        <View style={styles.Pesquisar}>
          <TextInput
            placeholder="Pesquisar hospedagens..."
            placeholderTextColor="#555"
            style={styles.input}
            value={busca}
            onChangeText={setBusca}
          />
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        </View>
      </View>

      {/* LISTA */}
      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        {listaFiltrada.slice(0, quantidade).map((h, index) => {
          const nome = h.nome || h.titulo || `Hospedagem ${index + 1}`;
          const descricao = h.descricao || h.description || "";
          const endereco = h.endereco || "";

          return (
            <TouchableOpacity
              key={h.id || h.place_id || index}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("DetalhesItem", { item: h, tipo: "hospedagem" })}
            >
              <View style={styles.imagemPlaceholder}>
                <Ionicons name="bed" size={40} color="#FB8837" />
              </View>

              <View style={styles.info}>
                <Text style={styles.nome}>{nome}</Text>
                {descricao ? <Text style={styles.descricao} numberOfLines={2}>{descricao}</Text> : null}
                { (h.latitude || h.longitude || endereco) ? (
                  <TouchableOpacity onPress={() => abrirMapa(h)}>
                    <Text style={[styles.endereco, { textDecorationLine: 'underline', color: '#0066cc' }]} numberOfLines={1}>
                      📍 {endereco || `${h.latitude}, ${h.longitude}`}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              <TouchableOpacity style={styles.botaoFavorito} onPress={() => toggleFavorito(h.id || h.place_id)}>
                <Ionicons
                  name={favoritos.includes(h.id || h.place_id) ? "heart" : "heart-outline"}
                  size={24}
                  color="#FB8837"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}

        {quantidade < listaFiltrada.length && (
          <TouchableOpacity style={styles.botaoMais} onPress={carregarMais}>
            <Text style={styles.textoMais}>Carregar mais ({listaFiltrada.length - quantidade} restantes)</Text>
          </TouchableOpacity>
        )}

        {listaFiltrada.length === 0 && (
          <View style={styles.semResultados}>
            <Ionicons name="search-outline" size={50} color="#ccc" />
            <Text style={styles.semResultadosTexto}>
              Nenhuma hospedagem encontrada{'\n'}
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

        <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Favoritos', { hospedagem: favoritosCompletos })}>
          <Ionicons name="heart" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Favoritos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  loadingText: { 
    marginTop: 10, 
    color: '#666' 
  },
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: { 
    width: '100%', 
    backgroundColor: '#FB8837', 
    alignItems: 'center', 
    paddingTop: 50, 
    paddingBottom: 40, 
    borderBottomLeftRadius: 100, 
    borderBottomRightRadius: 100, 
    position: 'relative' 
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
    marginTop: 5 
  },
  Pesquisar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 25, 
    width: '80%', 
    height: 40, 
    paddingHorizontal: 10, 
    marginTop: 15, 
    elevation: 3 
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
    backgroundColor: '#FFE8D6', 
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
    marginBottom: 3 
  },
  descricao: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 3 
  },
  endereco: { 
    fontSize: 12, 
    color: '#888', 
    fontStyle: 'italic' 
  },
  botaoFavorito: { 
    padding: 5, 
    marginLeft: 5 
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
  semResultados: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 40 
  },
  semResultadosTexto: { 
    textAlign: 'center', 
    color: '#666', 
    marginTop: 10, 
    fontSize: 16, 
    lineHeight: 24 
  },
  barra: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    backgroundColor: '#FB8837', 
    width: '100%', 
    height: 90, 
    marginTop: 'auto' 
  },
  botaoItem: { 
    alignItems: 'center', 
    padding: 10 
  },
  botaoTextoBarra: { 
    fontSize: 12, 
    color: '#000', 
    marginTop: 3, 
    fontWeight: '500' 
  }
});
