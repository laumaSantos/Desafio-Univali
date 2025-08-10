## desafioUnivali

Sistema de cadastro e listagem de produtos, desenvolvido em Vue 3 + Vite + TypeScript, com validação de formulários usando Zod + Vee-Validate e persistência de dados via LocalStorage.

## Tecnologias utilizadas

Vue 3 — Framework JavaScript.

Vite — Ferramenta de build rápida.

TypeScript — Tipagem estática.

Vue Router — Sistema de rotas.

Zod + Vee-Validate — Validação de formulários.

Lucide Icons — Ícones modernos.

CSS puro — Estilização personalizada sem frameworks CSS externos.

## Estrutura do projeto

src/
├── assets/ # Imagens, ícones e estilos globais
├── components/ # Componentes reutilizáveis
├── pages/ # Páginas da aplicação (Cadastro, Listagem, etc.)
├── router/ # Configuração de rotas
├── utils/ # Funções utilitárias e schemas de validação
│ ├── localStorage.ts # Funções para salvar e recuperar produtos
│ └── validationSchema.ts # Validações com Zod
├── App.vue # Componente raiz
└── main.ts # Ponto de entrada da aplicação

## Funcionalidades

✅ Cadastro de produtos com os campos:
✅ Listagem de produtos
✅ Edição e exclusão de produtos
✅ Persistência no LocalStorage
✅ Menu lateral colapsável e responsivo, com modo drawer no mobile

## Instalação e execução

# Instalar dependências

npm install

# Executar em ambiente de desenvolvimento

npm run dev

# Build para produção

npm run build

# Lint do código

npm run lint

## Uso

Acesse a tela de Cadastro de Produtos pelo menu lateral.

Preencha todos os campos obrigatórios.

Clique em Salvar:

Se for um novo produto, ele será adicionado à listagem.

Se estiver editando, as alterações serão salvas.

Clique em Cancelar para voltar à listagem sem salvar alterações.

## Observações

Os dados são salvos apenas no LocalStorage do navegador.

A máscara monetária e sufixos de unidade são aplicados via validação e formatação.

As mensagens de erro são exibidas de forma clara, conforme os requisitos.
