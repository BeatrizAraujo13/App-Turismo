// Favoritos.js (com link azul clicável para o mapa e coração estilo Restaurantes)

import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, Linking, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { apiServices } from "../services/API";
import { getLocalFavoritoIds, toggleLocalFavorito } from '../services/LocalFavoritos'; 

export default function Favoritos() {
    const navigation = useNavigation();
    const [favoritosCompletos, setFavoritosCompletos] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    const [quantidade, setQuantidade] = useState(5);

    useFocusEffect(
        useCallback(() => {
            carregarDadosFavoritos();
        }, [])
    );

    async function carregarDadosFavoritos() {
        setLoading(true);
        try {
            const favoritosIds = await getLocalFavoritoIds();

            const [restaurantesResponse, hospedagemResponse, pontosResponse, eventosResponse] = await Promise.all([
                apiServices.getComedorias(),
                apiServices.getHospedagem(),
                apiServices.getPontosTuristicos(),
                apiServices.getEventos()
            ]);

            const restaurantes = (restaurantesResponse.data || []).map(item => ({ ...item, tipo: 'restaurante' }));
            const hospedagem = (hospedagemResponse.data || []).map(item => ({ ...item, tipo: 'hospedagem' }));
            const pontos = (pontosResponse.data || []).map(item => ({ ...item, tipo: 'ponto' }));
            const eventos = (eventosResponse.data || []).map(item => ({ ...item, tipo: 'evento' }));

            const todosItens = [...restaurantes, ...hospedagem, ...pontos, ...eventos];

            const listaFinal = todosItens.filter(item => {
                const itemId = item.place_id || item.id;
                return favoritosIds.includes(itemId);
            });

            setFavoritosCompletos(listaFinal);

        } catch (error) {
            console.error("Erro ao carregar favoritos:", error);
            Alert.alert("Erro", "Não foi possível carregar favoritos.");
        } finally {
            setLoading(false);
        }
    }

    const handleToggleFavorito = async (item) => {
        const id = item.place_id || item.id;
        try {
            const novosIds = await toggleLocalFavorito(id);
            setFavoritosCompletos(prev => prev.filter(f => novosIds.includes(f.place_id || f.id)));
        } catch (error) {
            console.error("Erro ao atualizar favorito:", error);
            Alert.alert("Erro", "Não foi possível atualizar favorito.");
        }
    };

    const abrirMapa = (item) => {
        if (!item.latitude || !item.longitude) return;
        const url = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
        Linking.openURL(url).catch(() => {
            Alert.alert("Erro", "Não foi possível abrir o mapa.");
        });
    };

    const filtrados = favoritosCompletos.filter(f => {
        const nome = f.titulo || f.nome_local || f.nome || '';
        return nome.toLowerCase().includes(busca.toLowerCase());
    });

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FB8837" />
                <Text style={styles.loadingText}>Carregando favoritos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* TOPO COM GRADIENT */}
            <LinearGradient
                colors={['#FB8837', '#FFA500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.Topo}
            >
                <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={34} color="#000" />
                </TouchableOpacity>

                <Text style={styles.titulo}>Favoritos</Text>

                <View style={styles.Pesquisar}>
                    <Ionicons name="search" size={22} color="#777" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Pesquisar..."
                        placeholderTextColor="#555"
                        style={styles.input}
                        value={busca}
                        onChangeText={setBusca}
                    />
                </View>
            </LinearGradient>

            {/* LISTA */}
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
                {filtrados.length === 0 ? (
                    <View style={styles.semResultados}>
                        <Ionicons name="heart-outline" size={60} color="#ccc" />
                        <Text style={styles.semResultadosTexto}>
                            Você ainda não possui favoritos.
                        </Text>
                    </View>
                ) : (
                    filtrados.slice(0, quantidade).map((item, index) => {
                        const itemId = item.place_id || item.id;
                        const titulo = item.titulo || item.nome_local || item.nome || `Item ${index + 1}`;
                        const isFav = true;

                        return (
                            <TouchableOpacity
                                key={itemId || index}
                                style={styles.card}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate("DetalhesItem", { item, tipo: item.tipo })}
                            >
                                <View style={styles.imagemPlaceholder}>
                                    {item.imagem ? (
                                        <Image source={{ uri: item.imagem }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover" />
                                    ) : (
                                        <Ionicons
                                            name={item.tipo === 'evento' ? 'calendar' : item.tipo === 'ponto' ? 'map' : item.tipo === 'restaurante' ? 'restaurant' : 'bed'}
                                            size={40}
                                            color="#FB8837"
                                        />
                                    )}
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.nome} numberOfLines={1}>{titulo}</Text>
                                    
                                    {/* MOSTRAR BOTÃO MAPA PARA TODOS ITENS COM LAT/LNG */}
                                    {item.latitude && item.longitude && (
                                        <TouchableOpacity onPress={() => abrirMapa(item)}>
                                            <Text style={[styles.endereco, { color: '#0066cc', textDecorationLine: 'underline' }]}>
                                                📍 Abrir no mapa
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* FAVORITO COM GRADIENT */}
                                <TouchableOpacity
                                    style={styles.botaoFavoritoTouch}
                                    onPress={() => handleToggleFavorito(item)}
                                    activeOpacity={0.8}
                                >
                                    {isFav ? (
                                        <LinearGradient
                                            colors={['#FB8837', '#FFA500']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.favGradient}
                                        >
                                            <Ionicons name="heart" size={18} color="#fff" />
                                        </LinearGradient>
                                    ) : (
                                        <View style={styles.favOutline}>
                                            <Ionicons name="heart-outline" size={20} color="#FB8837" />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </TouchableOpacity>
                        );
                    })
                )}

                {quantidade < filtrados.length && (
                    <TouchableOpacity onPress={() => setQuantidade(prev => prev + 4)}>
                        <LinearGradient
                            colors={['#FB8837', '#FFA500']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.botaoMais}
                        >
                            <Text style={styles.textoMais}>Carregar mais ({filtrados.length - quantidade} restantes)</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {/* BARRA INFERIOR COM GRADIENT */}
            <LinearGradient
                colors={['#FB8837', '#FFA500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.barra}
            >
                <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate("Home")}>
                    <Ionicons name="home" size={24} color="#000" />
                    <Text style={styles.botaoTextoBarra}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate("Mapa")}>
                    <Ionicons name="map" size={24} color="#000" />
                    <Text style={styles.botaoTextoBarra}>Mapa</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoItem}>
                    <Ionicons name="heart" size={24} color="#000" />
                    <Text style={styles.botaoTextoBarra}>Favoritos</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#fff" 
    },
    loadingContainer: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    loadingText: { 
        marginTop: 10, 
        color: "#666" 
    },
    Topo: { 
        width: '100%', 
        alignItems: 'center', 
        paddingTop: 50, 
        paddingBottom: 40, 
        borderBottomLeftRadius: 100, 
        borderBottomRightRadius: 100 
    },
    botaoVoltar: { 
        position: "absolute", 
        top: 40, left: 20 
    },
    titulo: { 
        fontSize: 25, 
        fontWeight: "bold", 
        color: "#000" 
    },
    Pesquisar: { 
        flexDirection: "row", 
        alignItems: "center", 
        backgroundColor: "#fff", 
        borderRadius: 25, 
        width: '80%', 
        height: 40, 
        paddingHorizontal: 10, 
        marginTop: 15, 
        elevation: 3 
    },
    input: { 
        flex: 1, 
        color: "#333" 
    },
    searchIcon: { 
        marginLeft: 5 
    },
    card: { 
        flexDirection: 'row', 
        backgroundColor: '#f8f8f8', 
        borderRadius: 15, 
        padding: 15, 
        marginBottom: 15, 
        alignItems: 'center', 
        elevation: 3 
    },
    imagemPlaceholder: { 
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    info: { flex: 1 },
    nome: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#333', 
        marginBottom: 3 
    },
    endereco: { 
        fontSize: 12, 
        color: '#0066cc', 
        fontStyle: 'italic', 
        textDecorationLine: 'underline' 
    },
    botaoFavoritoTouch: { 
        marginLeft: 8, 
        padding: 6, 
        borderRadius: 24 
    },
    favOutline: { 
        width: 36, 
        height: 36, 
        borderRadius: 18, 
        borderWidth: 1.5, 
        borderColor: '#FB8837', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff' 
    },
    favGradient: { 
        width: 36, 
        height: 36, 
        borderRadius: 18, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    semResultados: { 
        alignItems: "center", 
        justifyContent: "center", 
        padding: 40 
    },
    semResultadosTexto: { 
        textAlign: "center", 
        color: "#666", 
        marginTop: 10, 
        fontSize: 16, 
        lineHeight: 24 
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
    botaoItem: { alignItems: 'center' },
    botaoMais: { 
        borderRadius: 25, 
        alignSelf: 'center', 
        marginTop: 10, 
        paddingVertical: 12, 
        paddingHorizontal: 18 
    },
    textoMais: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
});
