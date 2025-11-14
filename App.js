import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PontosTuristicos from './PontosTuristicos.js';
import Restaurantes from './Restaurantes.js';
import Hospedagem from './Hospedagem.js';
import Eventos from './Eventos.js';
import Favoritos from './Favoritos.js';
import Avaliar from './Avaliar.js';
import Mapa from './Mapa.js';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home');

  // TELA INICIAL 
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
          <TouchableOpacity style={styles.avaliar} onPress={() => setTelaAtual('avaliar')}>
            <Text style={styles.avaliarTexto}>Avalia-nos</Text>
          </TouchableOpacity>
        </View>

        {/* BARRA INFERIOR */}
        <View style={styles.barra}>
          <TouchableOpacity 
            style={styles.botaoItem} 
            onPress={() => setTelaAtual('home')}
          >
            <Ionicons name="home" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.botaoItem}
            onPress={() => setTelaAtual('mapa')}
          >
            <Ionicons name="map" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Mapa</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.botaoItem}
            onPress={() => setTelaAtual('favoritos')}
          >
            <Ionicons name="heart" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // OUTRAS TELAS
  return (
    <View style={styles.container}>
      {/* CONTEÚDO DAS TELAS */}
      <View style={styles.conteudo}>
        {telaAtual === 'pontos' && <PontosTuristicos onVoltar={() => setTelaAtual('home')} />}
        {telaAtual === 'restaurantes' && (
          <Restaurantes onVoltar={() => setTelaAtual('home')} />
        )}
        {telaAtual === 'hospedagem' && (
          <Hospedagem onVoltar={() => setTelaAtual('home')} />
        )}
        {telaAtual === 'eventos' && (
          <Eventos onVoltar={() => setTelaAtual('home')} />
        )}
        {telaAtual === 'favoritos' && (
          <Favoritos onVoltar={() => setTelaAtual('home')} />
        )}
      {telaAtual === 'mapa' && (
         <Mapa onVoltar={() => setTelaAtual('home')} />
      )}
      {telaAtual === 'avaliar' && (<Avaliar onVoltar={() => setTelaAtual('home')}/>)}
    </View>

      {/* BARRA INFERIOR DAS OUTRAS TELAS */}
      <View style={styles.barra}>
        <TouchableOpacity 
          style={styles.botaoItem} 
          onPress={() => setTelaAtual('home')}
        >
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoItem}
          onPress={() => setTelaAtual('mapa')}
        >
          <Ionicons name="map" size={24} color="#000" />
          <Text style={styles.botaoTextoBarra}>Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoItem}
          onPress={() => setTelaAtual('favoritos')}
        >
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
    paddingBottom: 40, 
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
    borderRadius: 25,
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
    marginTop: 10,
  },
  botaoVoltar: {
    backgroundColor: '#FB8837',
    width: '40%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
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
  telaPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    marginTop: 'auto',
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
  avaliar: {
    backgroundColor: '#FB8837',
    width: '35%',
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    marginTop: 30,
    
  },
  avaliarTexto: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 'center',
    fontWeight: 'bold',
    color: '#000'
  }
});