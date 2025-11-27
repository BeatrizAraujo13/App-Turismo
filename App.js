// Eu dividi o arquivo APP.JS em dois arquivos: APP.JS e HOME.JS
// O arquivo APP.JS agora é responsável apenas pela configuração da navegação
// O arquivo HOME.JS contém o componente Home que foi movido para lá
// Adicionei alguns comandos no favoritos, criei uma tela de login,
// em services criei auth e api para lidar com autenticação e chamadas de API
// tenho que verificar se a organização das pastas está correta e funcionando
// Ver sobre o servidor como funciona

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa o novo componente Home
import Login from './screens/Login.js';
import Home from './screens/Home'; 
import DetalhesItem from "./screens/DetalhesItem.js";

// Importa todas as outras telas
import Restaurantes from './screens/Restaurantes.js';
import Hospedagem from './screens/Hospedagem.js';
import PontosTuristicos from './screens/PontosTuristicos.js';
import Eventos from './screens/Eventos.js';
import Favoritos from './screens/Favoritos.js';
import Avaliar from './screens/Avaliar.js';
import Mapa from './screens/Mapa.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* LOGIN É A PRIMEIRA TELA */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}