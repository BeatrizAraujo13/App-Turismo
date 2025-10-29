import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PontosTuristicos from './PontosTuristicos';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home');

  // --- TELA INICIAL ---
  if (telaAtual === 'home') {
    return (
      <View style={styles.container}>
        {/* TOPO */}
        <View style={styles.Topo}>
          <Text style={styles.titulo}>VIVA CARUARU</Text>

          <TouchableOpacity style={styles.menuSuperior}>
            <Ionicons name="menu" size={30} color="#000" />
          </TouchableOpacity>

          <View style={styles.Pesquisar}>
            <TextInput
              placeholder="O que você procura..."
              placeholderTextColor="#555"
              style={styles.input}
            />
            <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          </View>

          <View style={styles.curva} />
        </View>

        {/* BOTÕES PRINCIPAIS */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.botao} onPress={() => setTelaAtual('pontos')}>
            <Text style={styles.botaoTextoPrincipal}>Pontos Turísticos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => setTelaAtual('restaurantes')}>
            <Text style={styles.botaoTextoPrincipal}>Restaurantes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => setTelaAtual('hospedagem')}>
            <Text style={styles.botaoTextoPrincipal}>Hospedagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => setTelaAtual('eventos')}>
            <Text style={styles.botaoTextoPrincipal}>Eventos</Text>
          </TouchableOpacity>
        </View>

        {/* BARRA INFERIOR */}
        <View style={styles.barra}>
          <TouchableOpacity style={styles.botaoItem}>
            <Ionicons name="home" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoItem}>
            <Ionicons name="map" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Mapa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoItem}>
            <Ionicons name="heart" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- OUTRAS TELAS ---
  return (
    <View style={styles.container}>

      {/* CONTEÚDO DAS TELAS - DEIXE CADA COMPONENTE CUIDAR DO SEU PRÓPRIO HEADER */}
      <View style={styles.conteudo}>
        {telaAtual === 'pontos' && <PontosTuristicos onVoltar={() => setTelaAtual('home')} />}
        {telaAtual === 'restaurantes' && (
          <Text style={styles.textoConteudo}>Aqui estão os Restaurantes recomendados.</Text>
        )}
        {telaAtual === 'hospedagem' && (
          <Text style={styles.textoConteudo}>Aqui você encontra opções de Hospedagem.</Text>
        )}
        {telaAtual === 'eventos' && (
          <Text style={styles.textoConteudo}>Aqui estão os Eventos disponíveis.</Text>
        )}
      </View>

      {/* BARRA INFERIOR */}
      <View style={styles.barra}>
        <TouchableOpacity style={styles.botaoItem} onPress={() => setTelaAtual('home')}>
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoItem}>
          <Ionicons name="map" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoItem}>
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
    backgroundColor: '#fff',
  },
  Topo: {
    width: '100%',
    backgroundColor: '#FB8837',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30, 
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: 'relative',
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
    borderRadius: 10,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontStyle: 'italic',
    color: '#333',
  },
  searchIcon: {
    marginLeft: 5,
  },
  curva: {
    position: 'absolute',
    bottom: -60,
    backgroundColor: '#FB8837',
    width: '130%',
    height: 120,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    zIndex: -1,
  },
  buttonsContainer: {
    marginTop: 80,
    alignItems: 'center',
    width: '100%',
  },
  botao: {
    backgroundColor: '#FB8837',
    width: '80%',
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  botaoTextoPrincipal: {
    color: '#191717',
    fontSize: 25,
    fontWeight: 'bold',
  },
  conteudo: {
    flex: 1,
    width: '100%',
  },
  textoConteudo: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FB8837',
    width: '100%',
    height: 90,
    marginTop: 110,
  },
  botaoItem: {
    alignItems: 'center',
  },
  botaoTextoBarra: {
    fontSize: 12,
    color: '#000',
    marginTop: 3,
  },
  menuSuperior: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});