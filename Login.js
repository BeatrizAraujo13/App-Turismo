import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  senha == '12345';
  email == 'tentar'

  function entrar() {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>

      {/* TOPO */}
      <View style={styles.Topo}>
        <Text style={styles.titulo}>VIVA CARUARU</Text>

      </View>

      {/* CAMPOS */}
      <View style={styles.areaLogin}>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputArea}>
          <Ionicons name="mail" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputArea}>
          <Ionicons name="lock-closed" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#777"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* BOTÃO ENTRAR */}
        <TouchableOpacity style={styles.botao} onPress={entrar}>
          <Text style={styles.botaoTextoPrincipal}>Entrar</Text>
        </TouchableOpacity>

        {/* CRIAR CONTA */}
        <TouchableOpacity>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  Topo: {
    backgroundColor: '#fe9311ff',
    paddingTop: 100,
    paddingHorizontal: 20,
    position: 'relative',
    alignItems: 'center',
    paddingBottom: 80,
    borderBottomLeftRadius: '50%',
    borderBottomRightRadius: '50%',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },

  areaLogin: {
    marginTop: 80,
    paddingHorizontal: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },

  botao: {
    backgroundColor: '#FB8837',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  botaoTextoPrincipal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  link: {
    marginTop: 15,
    fontSize: 16,
    color: '#4169E1',
    textAlign: 'center',
    fontWeight: '600',
  },
});