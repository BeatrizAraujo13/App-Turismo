import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { apiServices } from '../services/API';
import { getLocalFavoritoIds, toggleLocalFavorito } from '../services/LocalFavoritos';
import { LinearGradient } from 'expo-linear-gradient';

export default function PontosTuristicos() {
    const navigation = useNavigation();

    const [favoritos, setFavoritos] = useState([]);
    const [quantidade, setQuantidade] = useState(5);
    const [pontosTuristico, setPontos] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => { carregarDadosIniciais(); }, []);

    async function carregarDadosIniciais() {
        setLoading(true);
        await Promise.all([ carregarPontos(), carregarFavoritosUsuario() ]);
        setLoading(false);
    }

    async function carregarPontos() {
        try {
            const response = await apiServices.getPontosTuristicos();
            setPontos(response.data);
        } catch (e) {
            console.log("Erro ao carregar pontos turísticos:", e.message);
            Alert.alert("Erro de API", "Não foi possível carregar os pontos turísticos.");
        }
    }

    async function carregarFavoritosUsuario() {
        try {
            const favoritosIds = await getLocalFavoritoIds();
            setFavoritos(favoritosIds || []);
        } catch (e) {
            console.log("Erro ao carregar favoritos locais:", e.message);
        }
    }

    const toggleFavorito = async (id) => {
        const isFavoritado = favoritos.includes(id);
        // otimista UI
        setFavoritos(prev => isFavoritado ? prev.filter(f => f !== id) : [...prev, id]);

        try {
            const novosFavoritos = await toggleLocalFavorito(id);
            setFavoritos(novosFavoritos || []);
        } catch (e) {
            console.log("Erro ao salvar/remover favorito localmente:", e.message);
            // rollback
            setFavoritos(prev =>
                isFavoritado ? [...prev, id] : prev.filter(f => f !== id)
            );
            Alert.alert("Erro", "Não foi possível salvar seu favorito localmente.");
        }
    };

    const listaFiltrada = pontosTuristico.filter(p => {
        if (!p) return false;
        return (p.titulo || '').toLowerCase().includes(busca.toLowerCase());
    });

    const abrirMapa = (ponto) => {
        if (ponto.latitude != null && ponto.longitude != null) {
            const url = `https://www.google.com/maps/search/?api=1&query=${ponto.latitude},${ponto.longitude}`;
            Linking.openURL(url).catch(err => console.error("Erro ao abrir o Google Maps", err));
        } else if (ponto.endereco) {
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ponto.endereco)}`;
            Linking.openURL(url).catch(err => console.error("Erro ao abrir o Google Maps", err));
        } else {
            Alert.alert('Localização', 'Endereço ou coordenadas não disponíveis.');
        }
    };

    const favoritosCompletos = pontosTuristico.filter(p => favoritos.includes(p.place_id || p.id));

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FB8837" />
                <Text style={styles.loadingText}>Carregando pontos turísticos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* TOPO */}
            <LinearGradient
                colors={['#FB8837', '#FFA500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.Topo}
            >
                <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.titulo}>Pontos Turísticos</Text>
                <View style={styles.Pesquisar}>
                    <TextInput
                        placeholder="Buscar pontos turísticos..."
                        placeholderTextColor="#555"
                        style={styles.input}
                        value={busca}
                        onChangeText={setBusca}
                    />
                    <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
                </View>
            </LinearGradient>

            {/* LISTA DE PONTOS */}
            <ScrollView style={styles.listaContainer} contentContainerStyle={styles.listaConteudo}>
                {listaFiltrada.slice(0, quantidade).map((ponto, index) => {
                    const titulo = ponto.titulo || `Ponto Turístico ${index + 1}`;
                    const endereco = ponto.endereco || 'Endereço não disponível';
                    const descricao = ponto.descricao || ponto.description || endereco;
                    const placeId = ponto.place_id || ponto.id;

                    const isFav = placeId && favoritos.includes(placeId);

                    return (
                        <TouchableOpacity
                            key={placeId || index.toString()}
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("DetalhesItem", { item: ponto, tipo: "ponto" })}
                        >
                            <View style={styles.imagemPlaceholder}>
                                <Ionicons name="location" size={40} color="#FB8837" />
                                <Text style={styles.numeroCard}>{index + 1}</Text>
                            </View>

                            <View style={styles.info}>
                                <Text style={styles.nome} numberOfLines={1}>{titulo}</Text>
                                <Text style={styles.descricao} numberOfLines={2}>{descricao}</Text>
                                { (ponto.latitude != null || ponto.longitude != null || ponto.endereco) && (
                                    <TouchableOpacity onPress={() => abrirMapa(ponto)}>
                                        <Text style={[styles.endereco, { textDecorationLine: 'underline', color: '#0066cc' }]} numberOfLines={1}>
                                            📍 {endereco}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* BOTÃO DE FAVORITO - igual ao Eventos.js */}
                            {placeId && (
                                <TouchableOpacity
                                    style={styles.botaoFavoritoTouch}
                                    onPress={() => toggleFavorito(placeId)}
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
                            )}
                        </TouchableOpacity>
                    );
                })}

                {quantidade < listaFiltrada.length && (
                    <TouchableOpacity onPress={() => setQuantidade(prev => prev + 4)}>
                        <LinearGradient
                            colors={['#FB8837', '#FFA500']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.botaoMais}
                        >
                            <Text style={styles.textoMais}>Carregar mais ({listaFiltrada.length - quantidade} restantes)</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}

                {listaFiltrada.length === 0 && (
                    <View style={styles.semResultados}>
                        <Ionicons name={busca ? "search-outline" : "location-outline"} size={50} color="#ccc" />
                        <Text style={styles.semResultadosTexto}>
                            {busca ? `Nenhum ponto turístico encontrado para "${busca}"` : "Nenhum ponto turístico disponível."}
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* BARRA INFERIOR */}
            <LinearGradient
                colors={['#FB8837', '#FFA500']}
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
    );
}

const styles = StyleSheet.create({
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    loadingText: { marginTop: 10, color: '#666' },
    container: { flex: 1, backgroundColor: '#fff' },
    Topo: { width: '100%', alignItems: 'center', paddingTop: 50, paddingBottom: 40, borderBottomLeftRadius: 100, borderBottomRightRadius: 100 },
    Pesquisar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 25, width: '80%', height: 40, paddingHorizontal: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginTop: 15 },
    botaoVoltar: { position: 'absolute', top: 40, left: 20 },
    titulo: { fontSize: 25, fontWeight: 'bold', color: '#000', marginTop: 5 },
    searchIcon: { marginLeft: 5 },
    input: { flex: 1, fontStyle: 'italic', color: '#333' },
    listaContainer: { flex: 1, width: '100%' },
    listaConteudo: { padding: 20, paddingBottom: 100 },
    card: { flexDirection: 'row', backgroundColor: '#f8f8f8', borderRadius: 15, padding: 12, marginBottom: 12, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
    imagemPlaceholder: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFE8D6', justifyContent: 'center', alignItems: 'center', marginRight: 12, position: 'relative' },
    numeroCard: { position: 'absolute', fontSize: 11, fontWeight: 'bold', color: '#FB8837', top: 4, right: 6 },
    info: { flex: 1 },
    nome: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 3 },
    descricao: { fontSize: 13, color: '#666', marginBottom: 3 },
    endereco: { fontSize: 12, color: '#888', fontStyle: 'italic' },

    // área de toque do favorito (maior)
    botaoFavoritoTouch: { marginLeft: 8, padding: 6, borderRadius: 24 },

    // gradient circle quando favoritado
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

    // outline quando não favoritado
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

    botaoMais: { borderRadius: 25, alignSelf: 'center', marginTop: 10, paddingVertical: 12, paddingHorizontal: 18 },
    textoMais: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    semResultados: { alignItems: 'center', justifyContent: 'center', padding: 40 },
    semResultadosTexto: { textAlign: 'center', color: '#666', marginTop: 10, fontSize: 16, lineHeight: 24 },
    barra: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: 90, marginTop: 'auto', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    botaoItem: { alignItems: 'center', padding: 10 },
    botaoTextoBarra: { fontSize: 12, color: '#000', marginTop: 3, fontWeight: '500' }
});
