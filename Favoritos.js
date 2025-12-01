import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { apiServices } from "../services/API";
import { getToken } from "../services/auth";

export default function Favoritos() {
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarFavoritos();
  }, []);

  async function carregarFavoritos() {
    try {
      const token = await getToken();
      const res = await apiServices.getFavoritos(token);
      setFavoritos(res.data);
    } catch (error) {
      console.log("Erro ao carregar favoritos:", error.message);
    }
  }

  const filtrados = favoritos.filter(f =>
    f.nome_local.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.Topo}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Favoritos</Text>

        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar favoritos..."
            placeholderTextColor="#555"
            style={styles.input}
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      {/* Lista */}
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {filtrados.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#555", marginTop: 30 }}>
            Nenhum favorito encontrado.
          </Text>
        ) : (
          filtrados.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("DetalhesItem", { item, tipo: item.tipo })}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.nome}>{item.nome_local}</Text>
                <Text style={styles.descricao}>{item.descricao || "Sem descrição"}</Text>
              </View>
              <Ionicons name="heart" size={28} color="#FB8837" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Barra inferior */}
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
  container: { flex: 1, backgroundColor: "#fff" },
  Topo: {
    backgroundColor: "#FB8837",
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: "center",
  },
  botaoVoltar: { position: "absolute", top: 40, left: 20 },
  titulo: { fontSize: 25, fontWeight: "bold", color: "#000", marginTop: 3, marginBottom: 10 },
  Pesquisar: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 25, width: "80%", height: 40, paddingHorizontal: 10, elevation: 3 },
  input: { flex: 1, fontStyle: "italic", color: "#333" },
  searchIcon: { marginRight: 5 },
  card: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f7f7f7", borderRadius: 15, padding: 15, marginBottom: 15, elevation: 3, alignItems: "center" },
  nome: { fontSize: 18, fontWeight: "bold", color: "#333" },
  descricao: { fontSize: 14, color: "#555" },
  barra: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#FB8837", width: "100%", height: 90 },
  botaoItem: { alignItems: "center" },
  botaoTextoBarra: { fontSize: 12, color: "#000", marginTop: 3 },
});
