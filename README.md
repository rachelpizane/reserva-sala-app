# 📅 Reserva de Salas App

Interface web desenvolvida em React com TypeScript para gerenciamento de reservas de salas de reunião.

A aplicação permite visualizar a agenda semanal, criar reservas e gerenciar salas de forma intuitiva e responsiva.

<br>

🔗 Acesse o sistema: https://reserva-sala-app.onrender.com/

⚠️ *A aplicação pode levar alguns segundos para carregar na primeira utilização devido ao carregamento inicial da API hospedada.*

<br>


## 📡 Integração com backend
Frontend configurado para consumo de uma API REST externa, responsável pelas operações de salas, reservas e agenda semanal.

<br>

🔗 Repositório da API: [link](https://github.com/rachelpizane/reserva-sala-api)

🚨 *Certifique-se de que a API esteja em execução para uso completo da aplicação.*

<br>

## ✨ Principais funcionalidades
- **Visualização da agenda semanal**: Exibe reservas organizadas por dia, com navegação entre semanas.
- **Criação de reservas**: Permite agendar salas em horários específicos com validação de conflitos.
- **Cadastro de salas**: Interface para criação de salas de reunião.
- **Validação de formulários**: Uso de React Hook Form + Zod para validação de dados em tempo real.
- **Consumo eficiente da API**: Gerenciamento de estado assíncrono com React Query (TanStack Query).
- **Interface mobile-first e responsiva**: Interface otimizada para dispositivos móveis, adaptando-se de forma fluida para telas maiores.
- **UI moderna com Shadcn UI e Tailwind CSS**: Uso de componentes prontos combinados com estilização utilitária para acelerar o desenvolvimento e manter consistência visual.

<br>

## 🛠️ Tecnologias utilizadas
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- Axios
- TanStack Query
- React Router DOM
- Vitest
- Testing Library
- MSW (Mock Service Worker)

<br>

## 🚀 Como rodar o projeto
### Pré-requisitos
- Node.js (versão LTS recomendada)
- Git

### 1. Clone o repositório
```bash
# Clone o repositório
git clone https://github.com/rachelpizane/reserva-sala-app.git

# Acesse a pasta do projeto
cd reserva-sala-app
```

## 2. Instale as dependências

```bash
npm install
```

## 3. Execute a aplicação

```bash
npm run dev
```

<br>

## 🧪 Testes

O projeto possui:

- Testes unitários
- Testes de integração de fluxos
- Mock de requisições com MSW

Para executar os testes:
```bash
npm run test
```

<br>

## 📊 Cobertura de testes

Para gerar o relatório de cobertura:

```bash
npm run test:coverage
```

O relatório será gerado em:

```bash
coverage/index.html
```

Abra o arquivo no navegador para visualizar os detalhes da cobertura.

<br>

## 🙋🏻‍♀️ Autora

Desenvolvido por [Rachel Pizane](https://br.linkedin.com/in/rachel-pizane). 💜