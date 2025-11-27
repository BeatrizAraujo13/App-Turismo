import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../services/API";
import { getToken } from "../services/auth";

export default function Favoritos() {
  const navigation = useNavigation();
  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    loadFavoritos();
  }, []);

  // CARREGAR FAVORITOS (GET)
  async function loadFavoritos() {
    try {
      const token = await getToken();

      const res = await api.get("/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavoritos(res.data);
    } catch (err) {
      console.log("Erro ao carregar favoritos:", err);
    }
  }

  // SALVAR FAVORITO (POST)
  async function salvarFavorito(placeId, nome) {
    try {
      const res = await api.post("/favoritos", {
        place_id_google: placeId,
        nome_local: nome,
      });
      return res.data;
    } catch (error) {
      console.log("Erro ao salvar favorito:", error);
    }
  }

  // ------- REMOVER FAVORITO (LOCAL) -------
  function toggleFavorito(id) {
    setFavoritos((prev) => prev.filter((item) => item.id !== id));
  }

  const icones = {
    restaurante: "restaurant",
    ponto: "camera",
    hospedagem: "bed",
    evento: "calendar",
    outro: "information-circle",
  };

  const filtrados = favoritos.filter((f) =>
    f.nome_local.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* TOPO */}
      <View style={styles.Topo}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Favoritos</Text>

        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar em favoritos..."
            placeholderTextColor="#555"
            style={styles.input}
            onChangeText={setBusca}
          />
        </View>
      </View>

      {/* LISTA */}
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {filtrados.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#555", marginTop: 30 }}>
            Nenhum favorito encontrado.
          </Text>
        ) : (
          filtrados.map((item) => (
            <View key={item.id} style={styles.card}>
              {/* DETALHES */}
              <TouchableOpacity
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("DetalhesItem", {
                    item,
                    tipo: item.tipo,
                  })
                }
              >
                <View style={styles.iconeContainer}>
                  <Ionicons
                    name={icones[item.tipo] || icones.outro}
                    size={40}
                    color="#FB8837"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{item.nome_local}</Text>
                  <Text style={styles.descricao}>{item.descricao || "Sem descrição"}</Text>
                </View>
              </TouchableOpacity>

              {/* BOTÃO DESFAVORITAR */}
              <TouchableOpacity onPress={() => toggleFavorito(item.id)} style={styles.botaoFavorito}>
                <Ionicons name="heart" size={28} color="#FB8837" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* BARRA INFERIOR */}
      <View style={styles.barra}>
        <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate("Mapa")}>
          <Ionicons name="map" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate("Favoritos")}>
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
    backgroundColor: "#fff" 
  },

  Topo: {
    backgroundColor: "#FB8837",
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: "center",
  },

  botaoVoltar: { 
    position: "absolute", 
    top: 40, 
    left: 20 
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginTop: 3,
    marginBottom: 10,
  },

  Pesquisar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    elevation: 3,
  },

  input: { flex: 1, fontStyle: "italic", color: "#333" },
  searchIcon: { marginRight: 5 },

  card: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },

  iconeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  nome: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#333" 
  },
  descricao: { 
    fontSize: 14, 
    color: "#555" 
  },

  botaoFavorito: { 
    padding: 5 
  },

  barra: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FB8837",
    width: "100%",
    height: 90,
    marginTop: "auto",
  },

  botaoItem: { 
    alignItems: "center" 
  },
  botaoTextoBarra: { 
    fontSize: 12, 
    color: "#000", 
    marginTop: 3 
  },
});