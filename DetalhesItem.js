import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DetalhesItem({ route }) {
  const navigation = useNavigation();
  const { item, tipo } = route.params;

  const [favorito, setFavorito] = useState(false);

  // Ícones diferentes para cada categoria
  const icones = {
    restaurante: "restaurant",
    ponto: "camera",
    hospedagem: "bed",
    evento: "calendar",
    outro: "information-circle"
  };

  return (
    <View style={styles.container}>
      
      {/* Header Laranja */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>{item.nome}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>

        {/* Ícone Principal */}
        <View style={styles.iconeContainer}>
          <Ionicons name={icones[tipo] || icones.outro} size={80} color="#FB8837" />
        </View>

        {/* Nome */}
        <Text style={styles.nome}>{item.nome}</Text>

        {/* Descrição */}
        <Text style={styles.descricao}>{item.descricao}</Text>

        {/* Informação extra opcional */}
        {item.endereco && (
          <Text style={styles.extra}>📍 Endereço: {item.endereco}</Text>
        )}

        {item.horario && (
          <Text style={styles.extra}>⏰ Horário: {item.horario}</Text>
        )}

        {item.telefone && (
          <Text style={styles.extra}>📞 Telefone: {item.telefone}</Text>
        )}

        {/* Botão Favoritar */}
        <TouchableOpacity 
          style={styles.favoritarBtn} 
          onPress={() => setFavorito(prev => !prev)}
        >
          <Ionicons 
            name={favorito ? "heart" : "heart-outline"} 
            size={30} 
            color="#FB8837" 
          />
          <Text style={styles.favoritarTexto}>
            {favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#FB8837",
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80
  },

  botaoVoltar: {
    position: "absolute",
    top: 50,
    left: 20,
  },

  headerTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },

  conteudo: { padding: 20 },

  iconeContainer: {
    alignSelf: "center",
    backgroundColor: "#fff",
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    marginBottom: 20
  },

  nome: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20
  },

  descricao: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    textAlign: "center"
  },

  extra: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },

  favoritarBtn: {
    marginTop: 30,
    alignSelf: "center",
    alignItems: "center"
  },

  favoritarTexto: {
    marginTop: 5,
    fontSize: 14,
    color: "#444"
  }
});