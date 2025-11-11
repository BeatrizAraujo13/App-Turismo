import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const CaixaOpiniaoEmojis = () => {
  const [sentimento, setSentimento] = useState('');
  const [comentario, setComentario] = useState('');

  const emojis = [
    { emoji: '😠', label: 'Péssimo', value: 'pessimo' },
    { emoji: '😞', label: 'Ruim', value: 'ruim' },
    { emoji: '😐', label: 'Regular', value: 'regular' },
    { emoji: '😊', label: 'Bom', value: 'bom' },
    { emoji: '😍', label: 'Excelente', value: 'excelente' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Como foi sua experiência?</Text>
      
      <Text style={styles.label}>Selecione seu sentimento:</Text>
      <View style={styles.emojisContainer}>
        {emojis.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.emojiButton,
              sentimento === item.value && styles.emojiSelecionado
            ]}
            onPress={() => setSentimento(item.value)}
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
        numberOfLines={3}
        value={comentario}
        onChangeText={setComentario}
      />

      <TouchableOpacity 
        style={[
          styles.botao,
          !sentimento && styles.botaoDesabilitado
        ]}
        disabled={!sentimento}
        onPress={() => {
          const sentimentoSelecionado = emojis.find(e => e.value === sentimento);
          alert(`Obrigado! Sentimento: ${sentimentoSelecionado?.label}`);
        }}
      >
        <Text style={styles.botaoTexto}>Enviar Feedback</Text>
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
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  emojisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  emojiButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    minWidth: 60,
  },
  emojiSelecionado: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 5,
  },
  emojiLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 80,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#ccc',
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CaixaOpiniaoEmojis;