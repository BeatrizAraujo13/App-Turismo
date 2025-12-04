import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Linking, Alert, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { apiServices } from '../services/API';

export default function DetalhesItem({ route }) {
  const navigation = useNavigation();
  const { item, tipo } = route.params;

  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState("");
  const [listaComentarios, setListaComentarios] = useState([]);
  const [loadingComentarios, setLoadingComentarios] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [skip, setSkip] = useState(0);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);

  const icones = {
    restaurante: "restaurant",
    ponto: "camera",
    hospedagem: "bed",
    evento: "calendar",
    outro: "information-circle"
  };

  const abrirMapa = () => {
    if (item.latitude && item.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
      Linking.openURL(url).catch(() => Alert.alert("Erro", "Não foi possível abrir o Google Maps."));
    } else if (item.endereco) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.endereco)}`;
      Linking.openURL(url).catch(() => Alert.alert("Erro", "Não foi possível abrir o Google Maps."));
    } else {
      Alert.alert("Informação", "Coordenadas ou endereço não disponíveis.");
    }
  };

 const carregarAvaliacoes = async (novoSkip = 0, append = false) => {
  if (!item.place_id_google) return;
  setLoadingComentarios(true);
  try {
    const response = await apiServices.getAvaliacoes(item.place_id_google, novoSkip, 5);
    const dados = response.data || [];
    setListaComentarios(prev => append ? [...prev, ...dados] : dados);
    setSkip(novoSkip + dados.length);
  } catch (e) {
    console.log("Erro ao carregar avaliações:", e);
    Alert.alert("Erro", "Não foi possível carregar as avaliações.");
  } finally {
    setLoadingComentarios(false);
  }
};

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  const enviarComentario = async () => {
    if (avaliacao === 0) return Alert.alert("Atenção", "Dê uma nota antes de comentar!");
    if (comentario.trim() === "") return Alert.alert("Atenção", "O comentário não pode estar vazio!");
    if (!item.place_id_google) return;

    setEnviando(true);
    try {
      await apiServices.enviarFeedback(item.place_id_google, avaliacao, comentario.trim());
      setComentario("");
      setAvaliacao(0);
      carregarAvaliacoes(0); 
    } catch (e) {
      console.log("Erro ao enviar avaliação:", e);
      Alert.alert("Erro", "Não foi possível enviar a avaliação.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Informações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.imagemContainer}>
          {item.imagem ? (
            <Image source={{ uri: item.imagem }} style={styles.imagem} resizeMode="cover" />
          ) : (
            <Ionicons name={icones[tipo] || icones.outro} size={80} color="#FB8837" />
          )}
        </View>

        <Text style={styles.nome}>{item.nome}</Text>
        {item.descricao && <Text style={styles.descricao}>{item.descricao}</Text>}

        {item.endereco && (
          <TouchableOpacity onPress={abrirMapa}>
            <Text style={[styles.endereco, { textDecorationLine: 'underline', color: '#0066cc' }]}>
              📍 Endereço: {item.endereco}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.avaliacaoContainer}>
          <Text style={styles.avaliacaoTitulo}>Avaliação</Text>
          <View style={styles.starsRow}>
            {[1,2,3,4,5].map((n) => (
              <TouchableOpacity key={n} onPress={() => setAvaliacao(n)}>
                <Ionicons 
                  name={avaliacao >= n ? "star" : "star-outline"} 
                  size={30} 
                  color="#FB8837" 
                  style={{ marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          {avaliacao > 0 && <Text style={styles.notaText}>Você avaliou: {avaliacao} ⭐</Text>}
        </View>

        <View style={styles.comentarioContainer}>
          <Text style={styles.comentarioTitulo}>Comentário</Text>
          <TextInput
            style={styles.comentarioInput}
            placeholder="Escreva seu comentário..."
            value={comentario}
            onChangeText={setComentario}
            multiline
          />
          <TouchableOpacity 
            style={styles.comentarioBtn} 
            onPress={enviarComentario}
            disabled={enviando}
          >
            <Text style={styles.comentarioBtnTexto}>{enviando ? "Enviando..." : "Enviar Comentário"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listaContainer}>
          <Text style={styles.listaTitulo}>Avaliações Recentes</Text>
          {loadingComentarios && <ActivityIndicator size="large" color="#FB8837" />}
          {!loadingComentarios && listaComentarios.length === 0 && (
            <Text style={styles.semComentarios}>Nenhuma avaliação ainda.</Text>
          )}
          {!loadingComentarios && listaComentarios.map((item, index) => (
            <View key={index} style={styles.comentarioCard}>
              <View style={{ flexDirection: "row" }}>
                {[1,2,3,4,5].map((n) => (
                  <Ionicons 
                    key={n} 
                    name={item.nota >= n ? "star" : "star-outline"} 
                    size={18} 
                    color="#FB8837" 
                  />
                ))}
              </View>
              <Text style={styles.comentarioTexto}>{item.comentario}</Text>
            </View>
          ))}
          {/* Botão carregar mais */}
          {!loadingComentarios && skip < totalAvaliacoes && listaComentarios.length > 0 && (
            <TouchableOpacity 
              style={[styles.comentarioBtn, { marginTop: 10 }]} 
              onPress={() => carregarAvaliacoes(skip, true)}
            >
              <Text style={styles.comentarioBtnTexto}>Carregar mais</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: { 
    backgroundColor: "#FB8837", 
    paddingTop: 70, 
    paddingBottom: 50, 
    alignItems: "center", 
    borderBottomLeftRadius: 100, 
    borderBottomRightRadius: 100 
  },
  botaoVoltar: { 
    position: "absolute", 
    top: 50, 
    left: 20 
  },
  headerTitulo: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#000", 
    textAlign: "center" 
  },
  conteudo: { 
    padding: 20 
  },
  imagemContainer: { 
    alignSelf: "center", 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    elevation: 4, 
    marginBottom: 20 
  },
  imagem: { 
    width: 120, 
    height: 120, 
    borderRadius: 60 
  },
  nome: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#333", 
    textAlign: "center", 
    marginBottom: 15 
  },
  descricao: { 
    fontSize: 18, 
    color: "#555", 
    marginBottom: 15, 
    textAlign: "center" 
  },
  endereco: { 
    fontSize: 16, 
    marginBottom: 20 
  },
  avaliacaoContainer: { 
    marginTop: 20, 
    alignItems: "center" 
  },
  avaliacaoTitulo: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#333" 
  },
  starsRow: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginVertical: 15 
  },
  notaText: { 
    fontSize: 16, 
    color: "#555" 
  },
  comentarioContainer: { 
    marginTop: 20, 
    marginBottom: 30 
  },
  comentarioTitulo: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#333", 
    marginBottom: 10 
  },
  comentarioInput: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8, 
    padding: 10, 
    height: 80, 
    textAlignVertical: "top", 
    marginBottom: 10 
  },
  comentarioBtn: { 
    backgroundColor: "#FB8837", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center" 
  },
  comentarioBtnTexto: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  listaContainer: { 
    marginTop: 20 
  },
  listaTitulo: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  semComentarios: { 
    color: "#555", 
    fontStyle: "italic" 
  },
  comentarioCard: { 
    marginBottom: 15, 
    backgroundColor: "#f7f7f7", 
    padding: 10, 
    borderRadius: 8 
  },
  comentarioTexto: { 
    fontSize: 14, 
    color: "#333", 
    marginTop: 5 
  }
});
