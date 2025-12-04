import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { apiServices } from '../services/API';
import axios from 'axios';

const CaixaOpiniaoEmojis = ({ placeId }) => {
  const [nota, setNota] = useState(null);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  const emojis = [
    { emoji: '😠', label: 'Péssimo', value: 1 },
    { emoji: '😞', label: 'Ruim', value: 2 },
    { emoji: '😐', label: 'Regular', value: 3 },
    { emoji: '😊', label: 'Bom', value: 4 },
    { emoji: '😍', label: 'Excelente', value: 5 },
  ];

  // Pegar token salvo
  useEffect(() => {
    const fetchToken = async () => {
      const t = await AsyncStorage.getItem('token');
      if (!t) {
        Alert.alert("Atenção", "Você precisa estar logado para enviar feedback.");
        navigation.navigate('Login');
      } else {
        setToken(t);
      }
    };
    fetchToken();
  }, []);

 const enviarFeedback = async () => {
  try {
    if (!nota) {
      Alert.alert("Atenção", "Selecione uma nota.");
      return;
    }

    setLoading(true);

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      setLoading(false);
      return;
    }

    const place_id_google = "TESTE_PLACE_ID_123";

    const resp = await axios.post(
      "https://guiacaruaruapi.onrender.com/avaliacoes",
      {
        place_id_google,
        nota,
        comentario
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    Alert.alert("Obrigado!", "Seu feedback foi enviado!");
    setNota(null);
    setComentario("");

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
    Alert.alert("Erro", "Falha ao enviar feedback.");
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Como foi sua experiência?</Text>

      <Text style={styles.label}>Selecione sua nota:</Text>
      <View style={styles.emojisContainer}>
        {emojis.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[styles.emojiButton, nota === item.value && styles.emojiSelecionado]}
            onPress={() => setNota(item.value)}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.emojiLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Comentário (opcional):</Text>
      <TextInput
        style={styles.input}
        placeholder="Conte mais detalhes..."
        multiline
        value={comentario}
        onChangeText={setComentario}
      />

      <TouchableOpacity
        style={[styles.botao, !nota && styles.botaoDesabilitado]}
        disabled={!nota || loading}
        onPress={enviarFeedback}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.botaoTexto}>Enviar Feedback</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 15, 
    margin: 10, 
    marginTop: 50 
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 40, 
    marginTop: 50, 
    textAlign: 'center', 
    color: '#333' 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 12, 
    color: '#444' 
  },
  emojisContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  emojiButton: { 
    alignItems: 'center', 
    padding: 10, 
    borderRadius: 10, 
    backgroundColor: '#f8f8f8', 
    minWidth: 60 
  },
  emojiSelecionado: { 
    backgroundColor: '#E3F2FD', 
    borderColor: '#2196F3', 
    borderWidth: 2 
  },
  emoji: { 
    fontSize: 28, 
    marginBottom: 5 
  },
  emojiLabel: { 
    fontSize: 12, 
    color: '#666', 
    textAlign: 'center' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    padding: 12, 
    fontSize: 16, 
    minHeight: 80, 
    backgroundColor: '#f9f9f9', 
    marginBottom: 15 
  },
  botao: { 
    backgroundColor: '#4CAF50', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  botaoDesabilitado: { 
    backgroundColor: '#ccc'
  },
  botaoTexto: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  botaoVoltar: { 
    position: 'absolute', 
    top: 20, 
    left: 15 
  },
});

export default CaixaOpiniaoEmojis;
