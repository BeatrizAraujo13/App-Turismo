import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'react-native-drawer-layout';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home({ navigation }) {
  const [open, setOpen] = React.useState(false); 

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerPosition="left"
      drawerStyle={{ width: 220 }}
      renderDrawerContent={() => (
        <LinearGradient
          colors={['#FB8837', '#fbb430ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.drawer}
        >
          <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>Menu</Text>

            <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home')}>
              <Ionicons name="home" size={22} color="#000000ff" />
              <Text style={styles.drawerItemText}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Mapa')}>
              <Ionicons name="map" size={22} color="#000000ff" />
              <Text style={styles.drawerItemText}>Mapa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Favoritos')}>
              <Ionicons name="heart" size={22} color="#000000ff" />
              <Text style={styles.drawerItemText}>Favoritos</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    >
      {/* Conteúdo da Home */}
      <View style={styles.container}>

        {/* TOPO */}
        <LinearGradient
          colors={['#FB8837', '#f5b43aff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.Topo}
        >
          <Text style={styles.titulo}>VIVA CARUARU</Text>
          <TouchableOpacity
            style={styles.menuSuperior}
            onPress={() => setOpen(true)}
          >
            <Ionicons name="menu" size={30} color="#000" />
          </TouchableOpacity>
        </LinearGradient>

        {/* BOTÕES PRINCIPAIS */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('PontosTuristicos')}>
            <LinearGradient
              colors={['#FB8837', '#FFA500']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.botao}
            >
              <Text style={styles.botaoTextoPrincipal}>Pontos Turísticos</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Restaurantes')}>
            <LinearGradient
              colors={['#FB8837', '#FFB347']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.botao}
            >
              <Text style={styles.botaoTextoPrincipal}>Comedorias</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Hospedagem')}>
            <LinearGradient
              colors={['#FB8837', '#FFCC66']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.botao}
            >
              <Text style={styles.botaoTextoPrincipal}>Hospedagem</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Eventos')}>
            <LinearGradient
              colors={['#FB8837', '#f3c15dff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.botao}
            >
              <Text style={styles.botaoTextoPrincipal}>Eventos</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Avaliar')}>
            <LinearGradient
              colors={['#FB8837', '#fcb633ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.avaliar} 
            >
              <Text style={styles.botaoTextoAvaliar}>Avalia-nos</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* BARRA INFERIOR */}
        <LinearGradient
          colors={['#FB8837', '#f8ad21ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.barra}
        >
          <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Mapa')}>
            <Ionicons name="map" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Mapa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Favoritos')}>
            <Ionicons name="heart" size={24} color="#000" />
            <Text style={styles.botaoTextoBarra}>Favoritos</Text>
          </TouchableOpacity>
        </LinearGradient>

      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffffff' 
  },
  Topo: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: 'relative'
  },
  titulo: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 20 
  },
  buttonsContainer: { 
    marginTop: 80, 
    alignItems: 'center', 
    width: '100%' 
  },
  botao: { 
    width: 300, 
    height: 60, 
    borderRadius: 30, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 15 
  },
  botaoTextoAvaliar: { 
    color: '#191717', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  botaoTextoPrincipal: { 
    color: '#191717', 
    fontSize: 25, 
    fontWeight: 'bold' 
  },
  avaliar: { 
    width: 130, 
    height: 50, 
    borderRadius: 30, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 15 
  },
  barra: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    width: '100%', 
    height: 100, 
    marginTop: 'auto', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20 
  },
  botaoItem: { 
    alignItems: 'center', 
    left: 6, 
    marginTop: -5 
  },
  botaoTextoBarra: { 
    fontSize: 12, color: '#000000ff', 
    marginTop: 3 
  },
  menuSuperior: { 
    position: 'absolute', 
    top: 40, 
    left: 20 
  },
  drawer: { 
    flex: 1, 
    paddingTop: 40, 
  },
  drawerContent: { 
    flex: 1, 
    paddingHorizontal: 20 
  },
  drawerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#000000ff' 
  },
  drawerItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ffffff55' 
  },
  drawerItemText: { 
    fontSize: 18, 
    marginLeft: 15, 
    color: '#000000ff' 
  },
});
