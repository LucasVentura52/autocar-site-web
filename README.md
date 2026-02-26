# AutoCar Site Web

Landing page institucional da AutoCar desenvolvida com **Vue 3 + Vite + Vuetify**.

## Stack

- Vue 3 (`<script setup>`)
- Vuetify 3
- Vite 5
- Material Design Icons (`@mdi/font`)

## Funcionalidades

- Hero com animações, contadores e efeitos visuais
- Header responsivo com menu de acesso ao sistema
- Modal de cadastro com envio para WhatsApp
- Seção de soluções com cards expansivos
- Visualizador de imagens (zoom, rotação, navegação e download)
- Seções de Sobre, Perícia, Planos e Contato com animações por scroll
- Layout responsivo para desktop e mobile

## Como rodar localmente

```bash
npm install
npm run dev
```

A aplicação será iniciada em `http://localhost:5173`.

## Scripts

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de produção
- `npm run preview`: preview local do build

## Estrutura principal

- `src/App.vue`: página principal e seções
- `src/style.css`: estilos globais e animações
- `src/components/ImagePreviewDialog.vue`: visualizador de imagens
- `src/assets/img/`: imagens locais do projeto

## Observações

- As imagens principais e dos cards de soluções estão configuradas com arquivos locais em `src/assets/img/`.
- O favicon está configurado com imagem local do projeto.
