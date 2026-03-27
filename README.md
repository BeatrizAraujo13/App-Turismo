# App-Turismo

Aplicativo móvel de turismo focado em Caruaru (PE), desenvolvido com React Native e Expo. O objetivo é oferecer uma experiência simples e intuitiva para explorar pontos turísticos, restaurantes, hospedagens e eventos da região, facilitando o planejamento de viagens e descobertas locais.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API e Configurações](#-api-e-configurações)
- [Capturas de Tela](#-capturas-de-tela)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 🚀 Funcionalidades

- **📍 Exploração de Locais**: Listagem completa de pontos turísticos, restaurantes, eventos e hospedagens em Caruaru.
- **❤️ Sistema de Favoritos**: Salve seus locais preferidos usando armazenamento local (AsyncStorage) para acesso rápido.
- **🗺️ Mapa Integrado**: Visualize locais no mapa e acesse detalhes específicos de cada item.
- **🧭 Navegação Intuitiva**: Menu lateral (drawer) e barra de navegação inferior para uma experiência fluida.
- **⭐ Avaliação do App**: Tela dedicada para os usuários avaliarem e fornecerem feedback sobre o aplicativo.
- **🔐 Autenticação**: Sistema de login e criação de conta para personalizar a experiência.

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis nativos.
- **Expo**: Plataforma para desenvolvimento e build de apps React Native.
- **React Navigation**: Para navegação entre telas (Stack e Drawer).
- **Expo Vector Icons**: Ícones vetoriais para interface.
- **Expo Linear Gradient**: Gradientes para design visual.
- **AsyncStorage**: Persistência local de dados (favoritos).
- **Axios**: Cliente HTTP para requisições de API.
- **React Native Maps**: Integração com mapas para visualização de locais.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/): Instale globalmente com `npm install -g @expo/cli`
- Um emulador Android/iOS ou o aplicativo [Expo Go](https://expo.dev/client) no seu dispositivo móvel.

## ▶️ Instalação e Execução

1. **Clone o repositório** (se aplicável) ou navegue até a pasta do projeto:

   ```bash
   cd App-Turismo
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

   Ou, se usar Yarn:

   ```bash
   yarn install
   ```

3. **Inicie o servidor Expo**:

   ```bash
   npm start
   ```

   Ou use scripts específicos:

   - Para Android: `npm run android`
   - Para iOS: `npm run ios`
   - Para Web: `npm run web`

4. **Execute no dispositivo**:
   - Escaneie o QR code com o aplicativo Expo Go no seu celular.
   - Ou use um emulador configurado.

## 🗂️ Estrutura do Projeto

```
App-Turismo/
├── App.js                 # Ponto de entrada do aplicativo
├── index.js               # Arquivo de inicialização
├── app.json               # Configurações do Expo
├── package.json           # Dependências e scripts
├── assets/                # Imagens e recursos estáticos
├── screens/               # Telas da aplicação
│   ├── Home.js
│   ├── Login.js
│   ├── CriarConta.js
│   ├── PontosTuristicos.js
│   ├── Restaurantes.js
│   ├── Hospedagem.js
│   ├── Eventos.js
│   ├── Favoritos.js
│   ├── Mapa.js
│   ├── DetalhesItem.js
│   └── Avaliar.js
└── services/              # Serviços e utilitários
    ├── API.js
    ├── auth.js
    └── LocalFavoritos.js
```

- **`screens/`**: Contém todas as telas/componentes da interface do usuário.
- **`services/`**: Lógica de negócio, incluindo API, autenticação e gerenciamento de favoritos.

## 🔧 API e Configurações

- Configure as credenciais da API no arquivo `services/API.js`.
- Para o sistema de favoritos, o AsyncStorage é usado para persistência local.
- Ajuste rotas e endpoints conforme necessário para integração com backend.

---

Desenvolvido com ❤️ para promover o turismo em Caruaru.