# Galeria Foto

Aplicativo mobile desenvolvido em **Ionic Vue + Capacitor** que permite ao usuário se cadastrar, fazer login e gerenciar uma galeria pessoal de fotos, capturadas pela câmera do dispositivo ou selecionadas da galeria nativa.

## Dados acadêmicos

- **Aluno(a):** Isadora da Maia Torres
- **Curso:** Técnico em Informática
- **Unidade Curricular:** Codifica Aplicações para Dispositivos Móveis

## Sobre o projeto

O app foi construído para atender aos seguintes requisitos:

- **Tela de Login** — autenticação do usuário.
- **Tela de Cadastro** — criação de conta (nome, e-mail e senha).
- **Tela Home** (acessível somente após login):
  - Botão flutuante (FAB) no canto inferior direito, que abre um menu para escolher entre **Câmera** ou **Galeria**.
  - Grid com as fotos adicionadas pelo usuário.
  - Ação de remover cada foto individualmente, com confirmação.
- **Tela Sobre**:
  - Exibe a versão atual do app (lida diretamente do `package.json`).
  - Termos de Uso.
  - Termos de Privacidade.

Todo o fluxo é protegido por uma **guarda de rota**: só é possível acessar a Home e a tela Sobre com uma sessão ativa. O app **solicita permissão de acesso à câmera e à galeria** de fotos do dispositivo antes de utilizá-las, seguindo as boas práticas do Android.

### Decisões técnicas

- **Autenticação e persistência:** como o escopo do projeto não previa um backend, usuários, sessão e fotos são armazenados localmente no dispositivo (`localStorage`), simulando um fluxo real de login/cadastro.
- **Câmera/Galeria:** integração feita com o plugin oficial `@capacitor/camera`, com verificação e solicitação de permissões antes de cada captura.

## Tecnologias utilizadas

- [Ionic Framework](https://ionicframework.com/) (Vue)
- [Vue 3](https://vuejs.org/) + Vue Router
- [Capacitor](https://capacitorjs.com/) (`@capacitor/camera`, `@capacitor/android`)
- TypeScript

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Android Studio](https://developer.android.com/studio) (para rodar no Android)
- Ionic CLI (opcional, mas recomendado): `npm install -g @ionic/cli`

### 1. Clonar o repositório

\```bash
git clone <URL_DO_REPOSITORIO>
cd galeria_foto
\```

### 2. Instalar as dependências

\```bash
npm install
\```

### 3. Rodar no navegador (modo desenvolvimento)

\```bash
npm run dev
\```

Acesse `http://localhost:5173` no navegador. A captura de foto pela câmera do computador/webcam funciona pelo navegador; para testar a solicitação de permissão nativa do Android, use o passo 4.

### 4. Rodar no Android

\```bash
npm run build
npx cap sync android
npx cap open android
\```

Isso builda o projeto web, sincroniza com o projeto Android nativo e abre o Android Studio. A partir daí, basta selecionar um emulador (ou conectar um aparelho físico) e clicar em **Run**.

## Estrutura do projeto

\```
src/
├── views/
│   ├── LoginPage.vue      # Tela de login
│   ├── CadastroPage.vue   # Tela de cadastro
│   ├── HomePage.vue       # Tela home (grid + câmera/galeria)
│   └── SobrePage.vue      # Tela sobre (versão + termos)
├── services/
│   ├── auth.ts            # Cadastro, login, logout e sessão
│   └── fotos.ts           # Persistência local das fotos por usuário
├── router/
│   └── index.ts           # Rotas e guarda de autenticação
└── main.ts                # Ponto de entrada da aplicação
\```