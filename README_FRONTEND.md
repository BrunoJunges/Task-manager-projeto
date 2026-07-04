# Task Manager - Full Stack

Aplicação de Gerenciamento de Tarefas desenvolvida com React (Frontend) e NestJS (Backend).

## Estrutura do Projeto

```
task-manager/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── contexts/          # Context API (autenticação)
│   │   ├── pages/             # Páginas (Login, Tasks, Users)
│   │   ├── services/          # Serviços de API
│   │   ├── styles/            # Estilos CSS
│   │   └── routes/            # Rotas e proteção de rotas
│   └── package.json
│
├── src/               # NestJS Backend
│   ├── modules/
│   │   ├── auth/      # Autenticação e JWT
│   │   ├── task/      # Gerenciamento de tarefas
│   │   └── user/      # Gerenciamento de usuários
│   └── database/      # Configuração Prisma
│
└── prisma/            # ORM - Schema e Migrations

```

## Pré-requisitos

- Node.js 18+ e npm/yarn
- SQLite (já incluído no Prisma)

## Instalação e Setup

### 1. Backend (NestJS)

```bash
# Instalar dependências
npm install

# Configurar banco de dados
npx prisma migrate dev --name init

# Iniciar servidor de desenvolvimento
npm run start:dev
```

O backend estará disponível em: `http://localhost:3000`

### 2. Frontend (React + Vite)

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

## Funcionalidades

### Autenticação
- ✅ Login de usuários
- ✅ Autenticação com JWT
- ✅ Proteção de rotas
- ✅ Logout

### Gerenciamento de Usuários
- ✅ Listar usuários
- ✅ Criar novo usuário
- ✅ Validação de email e senha

### Gerenciamento de Tarefas (CRUD)
- ✅ Criar tarefa (com título, descrição, prioridade, data de vencimento)
- ✅ Listar tarefas
- ✅ Atualizar tarefa
- ✅ Deletar tarefa
- ✅ Marcar tarefa como concluída

### Prioridades
- Baixa (LOW)
- Média (MEDIUM)
- Alta (HIGH)

### Status da Tarefa
- Pendente (PENDING)
- Concluída (COMPLETED)

## Arquitetura Frontend

### Camadas

1. **Serviços (services/)**
   - Comunicação com a API
   - Gerenciamento de autenticação
   - Tipagem de dados

2. **Contextos (contexts/)**
   - AuthContext: Gerencia autenticação e estado do usuário
   - Disponibiliza userId para criar tarefas

3. **Componentes (components/)**
   - ProtectedRoute: Guard de rotas autenticadas
   - Navbar: Navegação e logout

4. **Páginas (pages/)**
   - Login: Formulário de autenticação
   - Tasks: CRUD de tarefas
   - Users: Listagem e criação de usuários

5. **Estilos (styles/)**
   - globals.css: Estilos globais
   - Arquivos específicos por componente/página

### Fluxo de Autenticação

1. Usuário faz login em `/`
2. Token JWT é armazenado em localStorage
3. AuthContext atualiza estado do usuário
4. Rotas protegidas redirecionam para login se não autenticado
5. Token é enviado em cada requisição via Interceptor do Axios

## Segurança Implementada

1. **Autenticação JWT**
   - Token armazenado em localStorage
   - Validação em cada requisição protegida

2. **Proteção de Rotas**
   - Componente ProtectedRoute verifica autenticação
   - Redirecionamento automático para login

3. **Interceptor de Requisições**
   - Token adicionado automaticamente em requisições
   - Logout automático ao receber erro 401

4. **Validação de Entrada**
   - Validação de email
   - Validação de senha mínima
   - Validação de datas

## Performance

1. **Lazy Loading**
   - Código dividido por rotas
   - Componentes carregam sob demanda

2. **Otimização de Estado**
   - Estado centralizado no Context
   - Re-renders minimizados

3. **Requisições Otimizadas**
   - Interceptor de API reutiliza configurações
   - Erros tratados globalmente

## Ambiente

### Variáveis de Ambiente (Backend)

```
DATABASE_URL=file:./dev.db
JWT_SECRET=segredoJWT
```

### API Base (Frontend)

Frontend conecta em: `http://localhost:3000`

## Comandos Úteis

### Backend
```bash
npm run start:dev     # Desenvolvimento com hot-reload
npm run build         # Build para produção
npm run start         # Executar build de produção
```

### Frontend
```bash
npm run dev           # Desenvolvimento com hot-reload
npm run build         # Build para produção
npm run preview       # Visualizar build de produção
npm run lint          # Linter (oxlint)
```

## Endpoints da API

### Autenticação
- `POST /auth/login` - Login
- `GET /auth/profile` - Perfil do usuário (protegido)

### Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário

### Tarefas
- `GET /tasks` - Listar tarefas (protegido)
- `POST /tasks` - Criar tarefa (protegido)
- `GET /tasks/:id` - Obter tarefa (protegido)
- `PUT /tasks/:id` - Atualizar tarefa (protegido)
- `DELETE /tasks/:id` - Deletar tarefa (protegido)
- `PATCH /tasks/:id/complete` - Marcar como concluída (protegido)

## Tecnologias Utilizadas

### Frontend
- **React 19** - UI Library
- **Vite** - Build tool e servidor de dev
- **TypeScript** - Tipagem estática
- **React Router v7** - Roteamento
- **Axios** - HTTP Client
- **CSS3** - Estilos responsivos

### Backend
- **NestJS** - Framework Node.js
- **Prisma** - ORM
- **SQLite** - Banco de dados
- **Passport.js** - Estratégia JWT
- **Class Validator** - Validação de dados

## Estrutura de Segurança

A aplicação implementa:

1. **Autenticação Baseada em JWT**
   - Token com expiração
   - Secret key configurável
   - Validação em cada requisição protegida

2. **Controle de Acesso**
   - Rotas protegidas no frontend
   - Guards JWT no backend
   - Redirecionamento automático

3. **Validação de Dados**
   - DTOs com validação
   - Sanitização de entrada
   - Tratamento de erros

## Próximos Passos / Melhorias

- [ ] Filtros e busca de tarefas
- [ ] Paginação de tarefas
- [ ] Sistema de categorias para tarefas
- [ ] Notificações em tempo real (WebSocket)
- [ ] Testes automatizados
- [ ] Deploy em produção
- [ ] Melhor tratamento de erros
- [ ] Cache de dados

## Licença

MIT
