import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = "https://guiacaruaruapi.onrender.com";

export default function CriarConta() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const criarConta = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/register`,
        { nome, email, senha },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Conta criada com sucesso:", response.data);
      Alert.alert("Sucesso!", "Conta criada com sucesso. Faça login agora.");
      navigation.navigate('Login');

    } catch (error) {
      console.log("Erro ao criar conta:", error.response?.data || error.message);

      // tratamento das mensagens de erro
      let mensagemErro = "Falha ao criar conta.";
      if (error.response?.data?.detail) {
        mensagemErro = error.response.data.detail
          .map(item => item.msg)
          .join(', ');
      }

      Alert.alert("Erro", mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#FFB347', '#FF7F11']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topo}
      >
        <Text style={styles.titulo}>CRIAR CONTA</Text>
      </LinearGradient>

      <View style={styles.formulario}>

        <Text style={styles.label}>Nome</Text>
        <View style={styles.inputArea}>
          <Ionicons name="person" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#777"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputArea}>
          <Ionicons name="mail" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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

        <TouchableOpacity onPress={criarConta} style={{ marginTop: 10 }}>
          <LinearGradient
            colors={['#FFB347', '#FF7F11']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.botao}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.botaoTexto}>Criar Conta</Text>
            }
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já tem conta? Faça login</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF' 
},
  topo: { 
    paddingTop: 100, 
    paddingHorizontal: 20, 
    alignItems: 'center', 
    paddingBottom: 80, 
    borderBottomLeftRadius: 120, 
    borderBottomRightRadius: 120 
},
  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#000' 
},
  formulario: { 
    marginTop: 50, 
    paddingHorizontal: 30 
},
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 6, 
    color: '#333' 
},
  inputArea: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    paddingVertical: 8, 
    marginBottom: 20 
},
  input: { 
    flex: 1, 
    marginLeft: 8, 
    fontSize: 16, 
    color: '#000' 
},
  botao: { 
    paddingVertical: 14, 
    borderRadius: 14, 
    alignItems: 'center' 
},
  botaoTexto: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000' 
},
  link: { 
    marginTop: 15, 
    fontSize: 16, 
    color: '#4169E1', 
    textAlign: 'center', 
    fontWeight: '600' 
},
});
