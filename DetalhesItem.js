import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DetalhesItem({ route }) {
  const navigation = useNavigation();
  const { item, tipo } = route.params;

  const [favorito, setFavorito] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState("");
  const [listaComentarios, setListaComentarios] = useState([]);


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

        {/* Avaliação por Estrelas */}
        <View style={styles.avaliacaoContainer}>
          <Text style={styles.avaliacaoTitulo}>Avaliação</Text>

          <View style={styles.starsRow}>
           {[1, 2, 3, 4, 5].map((estrela) => (
          <TouchableOpacity key={estrela} onPress={() => setAvaliacao(estrela)}>
            <Ionicons
              name={avaliacao >= estrela ? "star" : "star-outline"}
              style={styles.starIcon}
            />
          </TouchableOpacity>
     ))}
        </View>


          {avaliacao > 0 && (
            <Text style={styles.notaText}>Você avaliou: {avaliacao} ⭐</Text>
          )}
        </View>
        {/* Comentários */}
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
            onPress={() => {
              if (avaliacao === 0) return alert("Dê uma nota antes de comentar!");
              if (comentario.trim() === "") return alert("O comentário não pode estar vazio!");
              setListaComentarios([...listaComentarios, { nota: avaliacao, texto: comentario }]);
              setComentario("");
              setAvaliacao(0);
            }}
          >
            <Text style={styles.comentarioBtnTexto}>Enviar Comentário</Text>
          </TouchableOpacity>
        </View>
        {/* Lista de Comentários */}
<View style={styles.listaContainer}>
  <Text style={styles.listaTitulo}>Avaliações Recentes</Text>

  {listaComentarios.length === 0 ? (
    <Text style={styles.semComentarios}>
      Nenhuma avaliação ainda.
    </Text>
  ) : (
    listaComentarios.map((item, index) => (
      <View key={index} style={styles.comentarioCard}>
        
        {/* Estrelas da nota */}
        <View style={{ flexDirection: "row" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Ionicons
              key={n}
              name={item.nota >= n ? "star" : "star-outline"}
              size={18}
              color="#FB8837"
            />
          ))}
        </View>

        {/* Texto do comentário */}
        <Text style={styles.comentarioTexto}>{item.texto}</Text>

      </View>
    ))
  )}
</View>

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
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },

  starIcon: {
    fontSize: 30, 
    color: "#FB8837", 
    marginHorizontal: 5, 
  },
  avaliacaoContainer: {
    marginTop: 30,
    alignItems: "center"
  },

  avaliacaoTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10
  },
  notaText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5
  },
  comentarioContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
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
  }
});