import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Linking, Alert, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiServices } from '../services/API';
import { getLocalFavoritoIds, toggleLocalFavorito } from '../services/LocalFavoritos'; 

export default function Eventos() {
    const navigation = useNavigation();
    const [eventos, setEventos] = useState([]);
    const [busca, setBusca] = useState("");
    const [favoritosIds, setFavoritosIds] = useState([]);
    const [quantidade, setQuantidade] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => { carregarDadosIniciais(); }, []);
    useFocusEffect(useCallback(() => { carregarFavoritosLocais(); }, []));

    async function carregarDadosIniciais() {
        setLoading(true);
        await Promise.all([carregarEventosDaAPI(), carregarFavoritosLocais()]);
        setLoading(false);
    }

    async function carregarEventosDaAPI() {
        try {
            const response = await apiServices.getEventos();
            setEventos(response.data || []);
        } catch (e) {
            Alert.alert("Erro", "Não foi possível carregar a lista de eventos.");
        }
    }

    async function carregarFavoritosLocais() {
        try {
            const ids = await getLocalFavoritoIds();
            setFavoritosIds(ids || []);
        } catch (e) {
            console.log("Erro ao carregar favoritos locais:", e);
        }
    }

    async function handleToggleFavorito(id) {
        if (!id) return;
        try {
            const novos = await toggleLocalFavorito(id);
            setFavoritosIds(novos || []);
        } catch {
            Alert.alert("Erro", "Não foi possível atualizar o favorito.");
        }
    }

    const listaFiltrada = eventos.filter(ev => {
        const nome = ev.nome || ev.titulo || '';
        return nome.toLowerCase().includes(busca.toLowerCase());
    });

    const abrirMapa = (ev) => {
        if (ev.latitude && ev.longitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${ev.latitude},${ev.longitude}`;
            Linking.openURL(url).catch(() => Alert.alert("Erro", "Não foi possível abrir o mapa."));
        } else if (ev.endereco || ev.local) {
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.endereco || ev.local)}`;
            Linking.openURL(url).catch(() => Alert.alert("Erro", "Não foi possível abrir o mapa."));
        } else {
            Alert.alert("Informação", "Coordenadas ou endereço não disponíveis para este evento.");
        }
    };

    const carregarMais = () => setQuantidade(prev => prev + 4);
    const favoritosCompletos = eventos.filter(e => favoritosIds.includes(e.id || e.place_id));

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FB8837" />
                <Text style={styles.loadingText}>Carregando eventos...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* TOPO */}
            <LinearGradient colors={['#FB8837', '#FFB86C']} start={[0,0]} end={[1,1]} style={styles.topo}>
                <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>

                <Text style={styles.titulo}>Eventos</Text>

                <View style={styles.Pesquisar}>
                    <TextInput
                        placeholder="Buscar eventos..."
                        placeholderTextColor="#555"
                        style={styles.input}
                        value={busca}
                        onChangeText={setBusca}
                    />
                    <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
                </View>
            </LinearGradient>

            {/* LISTA */}
            <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
                {listaFiltrada.slice(0, quantidade).map((ev, index) => {
                    const id = ev.id || ev.place_id;
                    const titulo = ev.nome || ev.titulo || `Evento ${index + 1}`;
                    const endereco = ev.local || ev.endereco || "Endereço não informado";
                    const isFav = id && favoritosIds.includes(id);

                    return (
                        <TouchableOpacity
                            key={id || index.toString()}
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("DetalhesItem", { item: ev, tipo: "evento" })}
                        >
                            <View style={styles.imagemCiculo}>
                                {ev.imagem ? (
                                    <Image source={{ uri: ev.imagem }} style={styles.imagemCiculo} resizeMode="cover" />
                                ) : (
                                    <Ionicons name="calendar" size={40} color="#FB8837" />
                                )}
                            </View>

                            <View style={styles.info}>
                                <Text style={styles.nome} numberOfLines={1}>{titulo}</Text>
                                <TouchableOpacity onPress={() => abrirMapa(ev)}>
                                    <Text style={[styles.endereco, { textDecorationLine: 'underline', color: '#0066cc' }]}>
                                        📍 {endereco}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.botaoFavoritoTouch}
                                onPress={() => handleToggleFavorito(id)}
                                activeOpacity={0.8}
                            >
                                {isFav ? (
                                    <LinearGradient
                                        colors={['#FB8837', '#eb9d0cff']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
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
                })}

                {quantidade < listaFiltrada.length && (
                    <TouchableOpacity onPress={carregarMais}>
                        <LinearGradient colors={['#FB8837', '#FFB86C']} start={[0,0]} end={[1,1]} style={styles.botaoMais}>
                            <Text style={styles.textoMais}>Carregar mais ({listaFiltrada.length - quantidade} restantes)</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}

                {listaFiltrada.length === 0 && (
                    <View style={styles.semResultados}>
                        <Ionicons name="search-outline" size={50} color="#ccc" />
                        <Text style={styles.semResultadosTexto}>Nenhum evento encontrado</Text>
                    </View>
                )}
            </ScrollView>

            {/* BARRA INFERIOR */}
            <LinearGradient colors={['#FB8837', '#FFB86C']} start={[0,0]} end={[1,0]} style={styles.barra}>
                <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home" size={24} color="#000" />
                    <Text style={styles.botaoTextoBarra}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Mapa')}>
                    <Ionicons name="map" size={24} color="#000" />
                    <Text style={styles.botaoTextoBarra}>Mapa</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Favoritos', { eventos: favoritosCompletos })}>
                    <Ionicons name="heart" size={24} color="#000" />
                    <Text style={styles.botaoTextoBarra}>Favoritos</Text>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff' 
    },
    loadingText: { 
        marginTop: 10, 
        color: '#666' 
    },
    container: { 
        flex: 1, 
        backgroundColor: '#fff' 
    },
    topo: { 
        width: '100%', 
        alignItems: 'center', 
        paddingTop: 50, 
        paddingBottom: 40, 
        borderBottomLeftRadius: 100, 
        borderBottomRightRadius: 100, 
        position: 'relative' 
    },

    Pesquisar: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
        borderRadius: 25, 
        width: '80%', 
        height: 40, 
        paddingHorizontal: 10, 
        marginTop: 15, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        elevation: 3 
    },
    botaoVoltar: { 
        position: 'absolute', 
        top: 40, 
        left: 20 
    },
    titulo: { 
        fontSize: 25, 
        fontWeight: 'bold', 
        color: '#000', 
        marginTop: 5 
    },
    searchIcon: { 
        marginLeft: 5 
    },

    input: { 
        flex: 1, 
        fontStyle: 'italic', 
        color: '#333' 
    },
    listaContainer: { 
        flex: 1, 
        width: '100%' 
    },
    listaConteudo: { 
        padding: 20, 
        paddingBottom: 100 
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
    imagemCiculo: { 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden', 
        position: 'relative' 
    },
    info: { flex: 1 },
    nome: { 
        fontSize: 16, 
        fontWeight: '700', 
        color: '#333', 
        marginBottom: 3 
    },
    endereco: { 
        fontSize: 12, 
        color: '#888', 
        fontStyle: 'italic' 
    },
    botaoFavoritoTouch: { 
        marginLeft: 8, 
        padding: 6, 
        borderRadius: 24 
    },
    favGradient: { 
        width: 36, 
        height: 36, 
        borderRadius: 18, 
        justifyContent: 'center', 
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOpacity: 0.15, 
        shadowRadius: 4, 
        elevation: 3 
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
    semResultados: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 40 
    },
    semResultadosTexto: { 
        textAlign: 'center', 
        color: '#666', 
        marginTop: 10, 
        fontSize: 16, 
        lineHeight: 24 
    },
    barra: { 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        width: '100%', 
        height: 90, 
        marginTop: 'auto', 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20 
    },
    botaoItem: { 
        alignItems: 'center', 
        padding: 10 
    },
    botaoTextoBarra: { 
        fontSize: 12, 
        color: '#000', 
        marginTop: 3, 
        fontWeight: '500' 
    }
});
