import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITOS_KEY = '@MyApp:local_favoritos_ids';

/**
 * Retorna uma lista de IDs de pontos turísticos salvos localmente.
 * @returns {Promise<string[]>}
 */
export const getLocalFavoritoIds = async () => {
    try {
        const favoritosJson = await AsyncStorage.getItem(FAVORITOS_KEY);
        // Se houver dados, retorna o array, senão, retorna um array vazio.
        return favoritosJson != null ? JSON.parse(favoritosJson) : [];
    } catch (e) {
        console.error("Erro ao ler favoritos do AsyncStorage:", e);
        return [];
    }
};

/**
 * Adiciona ou remove um ID de ponto turístico da lista local.
 * @param {string} pontoId 
 * @returns {Promise<string[]>} A nova lista de IDs favoritados.
 */
export const toggleLocalFavorito = async (pontoId) => {
    try {
        const favoritosAtuais = await getLocalFavoritoIds();
        let novosFavoritos;

        if (favoritosAtuais.includes(pontoId)) {
            // Se já existe, remove (desfavoritar)
            novosFavoritos = favoritosAtuais.filter(id => id !== pontoId);
        } else {
            // Se não existe, adiciona (favoritar)
            novosFavoritos = [...favoritosAtuais, pontoId];
        }

        // Salva a nova lista no AsyncStorage
        await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(novosFavoritos));
        
        // Retorna a lista atualizada de IDs
        return novosFavoritos;
    } catch (e) {
        console.error("Erro ao salvar/remover favorito no AsyncStorage:", e);
        // Em caso de falha, retorne o estado atual conhecido
        return await getLocalFavoritoIds();
    }
};