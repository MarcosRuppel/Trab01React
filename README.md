# Sistema de Gestão de Usuários

Este projeto é um sistema web completo para cadastro, listagem, edição e visualização de usuários.  
Desenvolvido com **React** no frontend, **Node.js + Express** no backend, e **MySQL** como banco de dados.

## Tecnologias utilizadas

- React + Tailwind CSS
- Node.js + Express
- MySQL (com Drizzle ORM)
- Docker (opcional)
- Zod + React Hook Form

## Requisitos

- Node.js 18+
- MySQL Server
- pnpm (ou npm/yarn)

---

## 📁 Estrutura do Projeto

```
Trab01React/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md <<você está aqui>>
```

---

## 🚀 Como rodar o projeto

1. **Clone o repositório**

```bash
git clone https://github.com/MarcosRuppel/Trab01React.git
cd Trab01React
```

2. **Instale as dependências**

```bash
cd frontend
pnpm install

cd ../backend
pnpm install
```

3. **Configure o banco de dados**

- Inicie um banco de dados MySQL.
- Importe e execute o arquivo SQL:  
  `backend/criar_bd.sql`

4. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
```

5. **Rode o backend**

```bash
cd backend
pnpm dev
```

6. **Rode o frontend**

```bash
cd ../frontend
pnpm dev
```

---

## ✅ Funcionalidades

- Listagem paginada de usuários
- Cadastro e edição de usuários com validação
- Visualização detalhada
- Remoção de usuários
- Uso de avatar padrão se nenhum for fornecido
- Validações com Zod

---

## ✍️ Autor do Projeto

**Marcos Paulo Ruppel** - Bacharelado em Ciência da Computação - PUCPR 2025

---

## 📹 Apresentação

Um vídeo mostrando o sistema em funcionamento foi incluído no arquivo `.zip` para entrega no AVA.
