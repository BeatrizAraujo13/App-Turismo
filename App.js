import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login.js';
import Home from './screens/Home'; 
import DetalhesItem from "./screens/DetalhesItem.js";

import Restaurantes from './screens/Restaurantes.js';
import Hospedagem from './screens/Hospedagem.js';
import PontosTuristicos from './screens/PontosTuristicos.js';
import Eventos from './screens/Eventos.js';
import Favoritos from './screens/Favoritos.js';
import Avaliar from './screens/Avaliar.js';
import Mapa from './screens/Mapa.js';
import './screens/Favoritos.js';
import './screens/CriarConta.js';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* LOGIN/PRIMEIRA TELA */}
        <Stack.Screen name="Login" component={Login} />

        {/* HOME DEPOIS DO LOGIN */}
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="PontosTuristicos" component={PontosTuristicos} />
        <Stack.Screen name="Restaurantes" component={Restaurantes} />
        <Stack.Screen name="Hospedagem" component={Hospedagem} />
        <Stack.Screen name="Eventos" component={Eventos} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Avaliar" component={Avaliar} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="DetalhesItem" component={DetalhesItem} />
        <Stack.Screen name="CriarConta" component={require('./screens/CriarConta.js').default} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}