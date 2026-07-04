# GUIA DE TESTES - TASK MANAGER FRONTEND

## Pré-requisitos para Testar

1. Backend rodando em `http://localhost:3000`
2. Frontend rodando em `http://localhost:5173`
3. Database SQLite com schema inicializado

## 🧪 TESTES MANUAIS

### 1. Teste de Login

**Objetivo:** Verificar autenticação com JWT

**Passos:**
1. Acessar http://localhost:5173
2. Página de login deve aparecer
3. Tentar fazer login com:
   - Email: usuario@teste.com
   - Senha: senha123
4. Se sucesso, deve redirecionar para `/tasks`
5. Navbar deve aparecer com nome do usuário
6. Token deve estar em localStorage

**Validações:**
- ✅ Formulário valida email
- ✅ Formulário valida senha
- ✅ Erro deve aparecer se credenciais inválidas
- ✅ Loading spinner aparece durante autenticação

---

### 2. Teste de CRUD de Tarefas

#### 2.1 - Create (Criar Tarefa)

**Passos:**
1. Estar na página `/tasks` (autenticado)
2. Clicar em "+ Nova Tarefa"
3. Preencher:
   - Título: "Estudar TypeScript"
   - Descrição: "Aprender tipos avançados"
   - Prioridade: "Alta"
   - Data de Vencimento: Data futura
4. Clicar em "Criar"

**Validações:**
- ✅ Formulário valida campos obrigatórios
- ✅ Data deve ser obrigatória
- ✅ Tarefa aparece na lista
- ✅ Badge de prioridade e status aparecem corretamente
- ✅ Erro deve aparecer se data no passado

#### 2.2 - Read (Listar Tarefas)

**Passos:**
1. Estar autenticado em `/tasks`
2. Tarefas existentes devem aparecer em grid responsivo
3. Cada tarefa deve mostrar:
   - Título
   - Descrição
   - Prioridade (badge)
   - Status (badge)
   - Data de vencimento

**Validações:**
- ✅ Grid responsivo em mobile
- ✅ Tarefas concluídas devem ter styling diferente
- ✅ Loading state aparece ao carregar

#### 2.3 - Update (Editar Tarefa)

**Passos:**
1. Clicar em "✎ Editar" em uma tarefa
2. Formulário deve pré-popular com dados atuais
3. Modificar alguns dados
4. Clicar em "Atualizar"

**Validações:**
- ✅ Dados pre-populam corretamente
- ✅ Tarefa atualiza na lista
- ✅ Badges são atualizados
- ✅ Erro se data inválida

#### 2.4 - Delete (Deletar Tarefa)

**Passos:**
1. Clicar em "✕ Deletar" em uma tarefa
2. Confirmação deve aparecer
3. Confirmar exclusão
4. Tarefa deve desaparecer da lista

**Validações:**
- ✅ Confirmação aparece
- ✅ Tarefa removida da UI
- ✅ Erro tratado se falhar

#### 2.5 - Complete (Marcar Concluída)

**Passos:**
1. Clicar em "✓ Concluir" em uma tarefa
2. Tarefa deve mudar status para COMPLETED
3. Badge deve atualizar
4. Botão de concluir deve desaparecer

**Validações:**
- ✅ Status muda para COMPLETED
- ✅ UI atualiza imediatamente
- ✅ Não pode concluir tarefa já concluída

---

### 3. Teste de Gerenciamento de Usuários

#### 3.1 - List Usuários

**Passos:**
1. Clicar em "Usuários" na navbar
2. Tabela deve aparecer com todos os usuários

**Validações:**
- ✅ Tabela responsiva
- ✅ Colunas: Nome, Email, ID
- ✅ Total de usuários aparece no final

#### 3.2 - Create Usuário

**Passos:**
1. Clicar em "+ Novo Usuário"
2. Preencher:
   - Nome: "João Silva"
   - Email: "joao@teste.com"
   - Senha: "senha123"
3. Clicar em "Criar Usuário"

**Validações:**
- ✅ Email deve ser válido
- ✅ Senha mínimo 6 caracteres
- ✅ Novo usuário aparece na tabela
- ✅ Erro se email já existe
- ✅ Erro se campos vazios

---

### 4. Teste de Autenticação e Segurança

#### 4.1 - Proteção de Rotas

**Passos:**
1. Limpar localStorage (DevTools)
2. Tentar acessar `/tasks` diretamente
3. Deve redirecionar para login

**Validações:**
- ✅ Rotas protegidas redirecionam
- ✅ Loading state durante verificação

#### 4.2 - Token JWT

**Passos:**
1. Fazer login
2. Abrir DevTools > Application > localStorage
3. Token deve estar salvo
4. Fechar aba e reabrir
5. Deve estar autenticado

**Validações:**
- ✅ Token persistente
- ✅ Sessão mantida

#### 4.3 - Logout

**Passos:**
1. Estar autenticado
2. Clicar em "Sair" na navbar
3. Deve ir para página de login
4. localStorage deve estar vazio

**Validações:**
- ✅ Token removido
- ✅ Estado resetado
- ✅ Redirecionamento automático

---

### 5. Teste de Responsividade

#### 5.1 - Desktop (1920x1080)

**Validações:**
- ✅ Layout completo visível
- ✅ Grid de tarefas em 3-4 colunas
- ✅ Navbar em linha única

#### 5.2 - Tablet (768x1024)

**Validações:**
- ✅ Navbar em 2 linhas se necessário
- ✅ Grid de tarefas em 2 colunas
- ✅ Botões acessíveis

#### 5.3 - Mobile (375x667)

**Validações:**
- ✅ Navbar stacked
- ✅ Grid de tarefas em 1 coluna
- ✅ Tabela de usuários oculta ID
- ✅ Botões em full width
- ✅ Formulário fica legível

---

### 6. Teste de Tratamento de Erros

#### 6.1 - Erro de Conexão

**Passos:**
1. Desligar backend
2. Tentar fazer login
3. Erro deve aparecer

**Validações:**
- ✅ Mensagem de erro clara
- ✅ Não crasha a página

#### 6.2 - Erro 401 (Unauthorized)

**Passos:**
1. Remover token de localStorage (DevTools)
2. Tentar fazer ação protegida
3. Deve redirecionar para login

**Validações:**
- ✅ Erro tratado globalmente
- ✅ Logout automático

#### 6.3 - Validação de Entrada

**Passos:**
1. Tentar criar tarefa sem título
2. Tentar criar usuário sem email
3. Tentar definir data no passado

**Validações:**
- ✅ Validações no frontend aparecem
- ✅ Form não é enviado
- ✅ Mensagens de erro aparecem

---

## 📋 CHECKLIST DE TESTE

### Autenticação
- [ ] Login com credenciais corretas
- [ ] Erro com credenciais inválidas
- [ ] Token salvo em localStorage
- [ ] Logout remove token
- [ ] Rotas protegidas redirecionam
- [ ] Sessão persiste após recarregar

### Tarefas
- [ ] Criar tarefa com todos os campos
- [ ] Validações ao criar
- [ ] Editar tarefa existente
- [ ] Deletar tarefa com confirmação
- [ ] Marcar como concluída
- [ ] Listar tarefas corretamente
- [ ] Filtro por prioridade (visual)
- [ ] Filtro por status (visual)

### Usuários
- [ ] Listar usuários
- [ ] Criar novo usuário
- [ ] Validações de email e senha
- [ ] Erro se email existe

### UI/UX
- [ ] Navbar aparece após login
- [ ] Navbar desaparece no login
- [ ] Loading states funcionam
- [ ] Erros aparecem em alertas
- [ ] Formulários tem placeholder
- [ ] Botões tem hover effect
- [ ] Cores são consistentes

### Responsividade
- [ ] Desktop 100% funcional
- [ ] Tablet 100% funcional
- [ ] Mobile 100% funcional
- [ ] Sem overflow horizontal

### Performance
- [ ] Navegação é rápida
- [ ] Sem lag ao criar/editar
- [ ] Images carregam rápido
- [ ] Sem console errors

---

## 🚀 TESTE DE DEPLOY

Após todos os testes manuais:

1. Build frontend:
   ```bash
   npm run build
   ```

2. Verificar se sem erros

3. Testar preview:
   ```bash
   npm run preview
   ```

4. Verificar se funciona

---

## 📊 RESULTADOS ESPERADOS

| Teste | Status | Notas |
|-------|--------|-------|
| Login | ✅ | Redireciona para /tasks |
| Create Task | ✅ | Aparece na lista |
| Read Tasks | ✅ | Grid responsivo |
| Update Task | ✅ | Dados pre-populam |
| Delete Task | ✅ | Com confirmação |
| Complete Task | ✅ | Status muda |
| Users List | ✅ | Tabela responsiva |
| Create User | ✅ | Validações funcionam |
| Logout | ✅ | Remove token |
| Protected Routes | ✅ | Redireciona |
| Mobile | ✅ | 1 coluna de tasks |
| Tablet | ✅ | 2 colunas de tasks |
| Errors | ✅ | Alertas funcionam |

---

## 🎯 RESULTADO FINAL

Se todos os testes passarem, o frontend está pronto para:
- ✅ Apresentação para professores
- ✅ Demonstração de funcionalidades
- ✅ Deploy em produção
