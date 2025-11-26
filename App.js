import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DetalhesItem from "./DetalhesItem";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Drawer } from 'react-native-drawer-layout';

import Restaurantes from './Restaurantes';
import Hospedagem from './Hospedagem';
import PontosTuristicos from './PontosTuristicos';
import Eventos from './Eventos';
import Favoritos from './Favoritos';
import Avaliar from './Avaliar';
import Mapa from './Mapa';

const Stack = createNativeStackNavigator();

function Home({ navigation }) {
  const [open, setOpen] = React.useState(false); 

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerPosition="left"
      drawerStyle={styles.drawer}
      renderDrawerContent={() => (
        <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Menu</Text>

      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={22} color="#000" />
        <Text style={styles.drawerItemText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Mapa')}>
        <Ionicons name="map" size={22} color="#000" />
        <Text style={styles.drawerItemText}>Mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Favoritos')}>
        <Ionicons name="heart" size={22} color="#000" />
        <Text style={styles.drawerItemText}>Favoritos</Text>
      </TouchableOpacity>
        </View>
      )}
    >
      <View style={styles.container}>
        {/* TOPO */}
        <View style={styles.Topo}>
          <Text style={styles.titulo}>VIVA CARUARU</Text>

          <TouchableOpacity
            style={styles.menuSuperior}
            onPress={() => setOpen(true)} // <-- ABRE O DRAWER
          >
            <Ionicons name="menu" size={30} color="#000" />
          </TouchableOpacity>

          <View style={styles.curva} />
        </View>

        {/* BOTÕES PRINCIPAIS */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('PontosTuristicos')}
          >
            <Text style={styles.botaoTextoPrincipal}>Pontos Turísticos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('Restaurantes')}
          >
            <Text style={styles.botaoTextoPrincipal}>Comedorias</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('Hospedagem')}
          >
            <Text style={styles.botaoTextoPrincipal}>Hospedagem</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('Eventos')}
          >
            <Text style={styles.botaoTextoPrincipal}>Eventos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avaliar}
            onPress={() => navigation.navigate('Avaliar')}
          >
            <Text style={styles.avaliarTexto}>Avalia-nos</Text>
          </TouchableOpacity>
        </View>

        {/* BARRA INFERIOR */}
        <View style={styles.barra}>
          <TouchableOpacity
            style={styles.botaoItem}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="home" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoItem}
            onPress={() => navigation.navigate('Mapa')}
          >
            <Ionicons name="map" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Mapa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoItem}
            onPress={() => navigation.navigate('Favoritos')}
          >
            <Ionicons name="heart" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Drawer>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PontosTuristicos" component={PontosTuristicos} />
        <Stack.Screen name="Restaurantes" component={Restaurantes} />
        <Stack.Screen name="Hospedagem" component={Hospedagem} />
        <Stack.Screen name="Eventos" component={Eventos} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Avaliar" component={Avaliar} />
        <Stack.Screen name="Mapa" component={Mapa} />

        <Stack.Screen 
          name="DetalhesItem" 
          component={DetalhesItem} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  Topo: {
    width: '100%',
    backgroundColor: '#FB8837',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
    borderBottomLeftRadius: 110,
    borderBottomRightRadius: 110,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20
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
    width: '100%'
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
  botaoTextoPrincipal: {
    color: '#191717',
    fontSize: 25,
    fontWeight: 'bold'
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
    fontWeight: 'bold',
    color: '#000'
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
    alignItems: 'center'
  },
  botaoTextoBarra: {
    fontSize: 12,
    color: '#000',
    marginTop: 3
  },
  menuSuperior: {
    position: 'absolute',
    top: 40,
    left: 20
  },
  drawer: {
  width: 220, 
  backgroundColor: '#fb8837ff',
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  paddingTop: 40,
},

drawerContent: {
  flex: 1,
  paddingHorizontal: 20,
},

drawerTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  color: '#000',
},

drawerItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#ffffff55',
},

drawerItemText: {
  fontSize: 18,
  marginLeft: 15,
  color: '#000',
},
});
