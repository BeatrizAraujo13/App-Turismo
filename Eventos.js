import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Eventos({ onVoltar }) {

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

  // controla lista exibida
  const [quantidadeExibida, setQuantidadeExibida] = useState(5);

  // lista de favoritos (apenas IDs)
  const [favoritos, setFavoritos] = useState([]);

  // alterna favoritos
  function toggleFavorito(id) {
    if (favoritos.includes(id)) {
      // remove favorito
      setFavoritos(favoritos.filter(favId => favId !== id));
    } else {
      // adiciona favorito
      setFavoritos([...favoritos, id]);
    }
  }

  // botão ver mais
  function carregarMais() {
    setQuantidadeExibida(prev => prev + 4);
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Eventos</Text>

        <View style={styles.Pesquisar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar eventos..."
            placeholderTextColor="#555"
            style={styles.input}
          />
        </View>
      </View>

      {/* LISTA */}
      <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
        {eventos.slice(0, quantidadeExibida).map((evento) => (
          <View key={evento.id} style={styles.cardPonto}>
            <View style={styles.imagemPlaceholder}>
              <Ionicons name="location" size={40} color="#FB8837" />
            </View>

            <View style={styles.infoPonto}>
              <Text style={styles.nomePonto}>{evento.nome}</Text>
              <Text style={styles.descricaoPonto}>{evento.descricao}</Text>
            </View>

            {/* FAVORITO */}
            <TouchableOpacity
              style={styles.botaoFavorito}
              onPress={() => toggleFavorito(evento.id)}
            >
              <Ionicons
                name={favoritos.includes(evento.id) ? "heart" : "heart-outline"}
                size={24}
                color="#FB8837"
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* BOTÃO VER MAIS */}
        {quantidadeExibida < eventos.length && (
          <TouchableOpacity style={styles.botaoVejaMais} onPress={carregarMais}>
            <Text style={styles.vejaMaisTexto}>Ver mais</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#FB8837',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  botaoVoltar: { 
    position: 'absolute', 
    top: 40, 
    left: 20, 
    zIndex: 1, 
  },
  titulo: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 15,
  },
  Pesquisar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    elevation: 3,
  },
  input: { 
    flex: 1, 
    fontStyle: 'italic', 
    color: '#333',
  },

  searchIcon: { marginRight: 5 },

  listaContainer: { 
    flex: 1, 
    width: '100%' },
  listaConteudo: { padding: 20, paddingBottom: 120 },

  cardPonto: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  imagemPlaceholder: {
    width: 60, 
    height: 60, 
    borderRadius: 30,
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 15,
  },
  infoPonto: { 
    flex: 1 
  },
  nomePonto: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  descricaoPonto: { 
    fontSize: 14, 
    color: '#666' 
  },

  botaoFavorito: { padding: 5 },

  botaoVejaMais: {
    backgroundColor: '#FB8837',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  vejaMaisTexto: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});
