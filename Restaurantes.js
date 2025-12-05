import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Linking, Alert, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { apiServices } from '../services/API';
import { getLocalFavoritoIds, toggleLocalFavorito } from '../services/LocalFavoritos'; 
import { LinearGradient } from 'expo-linear-gradient';

export default function Restaurantes() {
    const navigation = useNavigation();
    const [favoritosIds, setFavoritosIds] = useState([]);
    const [quantidade, setQuantidade] = useState(5);
    const [restaurantes, setRestaurantes] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => { carregarDadosIniciais(); }, []);

    useFocusEffect(
        React.useCallback(() => { carregarFavoritosLocais(); }, [])
    );

    async function carregarDadosIniciais() {
        setLoading(true);
        try {
            const response = await apiServices.getComedorias(); 
            setRestaurantes(response.data || []);
            await carregarFavoritosLocais();
        } catch (e) {
            console.error("Erro ao carregar dados iniciais:", e.message);
            Alert.alert("Erro", "Não foi possível carregar os dados de restaurantes.");
        } finally { setLoading(false); }
    }
    
    async function carregarFavoritosLocais() {
        try {
            const ids = await getLocalFavoritoIds();
            setFavoritosIds(ids);
        } catch (e) { console.error("Erro ao carregar favoritos locais:", e); }
    }

    async function handleToggleFavorito(place_id) {
        if (!place_id) return;
        try {
            const novosIds = await toggleLocalFavorito(place_id);
            setFavoritosIds(novosIds);
        } catch (error) {
            console.error("Erro ao salvar favorito localmente:", error.message);
            Alert.alert("Erro", "Não foi possível atualizar o favorito.");
        }
    }

    const listaFiltrada = restaurantes.filter(r => {
        if (!r) return false;
        const nome = r.titulo || r.nome_local || '';
        return nome.toLowerCase().includes(busca.toLowerCase());
    });

    const abrirMapa = (item) => {
        if (item.latitude && item.longitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
            Linking.openURL(url).catch(err => { 
                console.error("Erro ao abrir o Google Maps:", err);
                Alert.alert("Erro", "Não foi possível abrir o mapa.");
            });
        } else { Alert.alert("Erro", "Coordenadas de localização não disponíveis."); }
    };

    const favoritosCompletos = restaurantes.filter(r => favoritosIds.includes(r.place_id || r.id));

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FB8837" />
                <Text style={styles.loadingText}>Carregando restaurantes...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* TOPO COM GRADIENT */}
            <LinearGradient
                colors={['#FB8837', '#FFA500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.Topo}
            >
                <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>

                <Text style={styles.titulo}>Comedorias</Text>

                <View style={styles.Pesquisar}>
                    <TextInput
                        placeholder="Buscar restaurantes..."
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
                {listaFiltrada.slice(0, quantidade).map((item, index) => {
                    const itemId = item.place_id || item.id;
                    const titulo = item.titulo || `Restaurante ${index + 1}`;
                    const endereco = item.endereco || 'Endereço não disponível';
                    const isFav = favoritosIds.includes(itemId);

                    return (
                        <TouchableOpacity
                            key={itemId || index}
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("DetalhesItem", { item, tipo: "restaurante" })}
                        >
                            {/* IMAGEM CIRCULAR */}
                            <View style={styles.imagemCiculo}>
                                {item.imagem ? (
                                    <Image
                                        source={{ uri: item.imagem }}
                                        style={styles.imagemCiculo} 
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <Ionicons name="restaurant" size={40} color="#FB8837" />
                                )}
                            </View>

                            <View style={styles.info}>
                                <Text style={styles.nome} numberOfLines={1}>{titulo}</Text>
                                <TouchableOpacity onPress={() => abrirMapa(item)}>
                                    <Text style={[styles.endereco, { textDecorationLine: 'underline', color: '#0066cc' }]} numberOfLines={1}>
                                        📍 {endereco}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* FAVORITO COM GRADIENT */}
                            <TouchableOpacity
                                style={styles.botaoFavoritoTouch}
                                onPress={() => handleToggleFavorito(itemId)}
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
                })}

                {quantidade < listaFiltrada.length && (
                    <TouchableOpacity onPress={() => setQuantidade(prev => prev + 4)}>
                        <LinearGradient
                            colors={['#FB8837', '#fdb633ff']}
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
                        <Ionicons name="search-outline" size={50} color="#ccc" />
                        <Text style={styles.semResultadosTexto}>
                            Nenhum restaurante encontrado{'\n'}
                            {busca ? `para "${busca}"` : ''}
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* BARRA INFERIOR COM GRADIENT */}
            <LinearGradient
                colors={['#FB8837', '#fcb530ff']}
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

                <TouchableOpacity style={styles.botaoItem} onPress={() => navigation.navigate('Favoritos', { pontos: favoritosCompletos })}>
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
    Topo: { 
        width: '100%', 
        alignItems: 'center', 
        paddingTop: 50, 
        paddingBottom: 40, 
        borderBottomLeftRadius: 100, 
        borderBottomRightRadius: 100 
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
        overflow: 'hidden', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'transparent' 
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
        color: '#888', 
        fontStyle: 'italic' 
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
        height: 100, 
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
