# GUIA RÁPIDO - COMEÇAR AGORA

Siga estes passos simples para rodar o frontend imediatamente!

---

## 🚀 SETUP EM 3 MINUTOS

### Passo 1: Instalar Dependências
```bash
cd frontend
npm install
```

### Passo 2: Iniciar Servidor
```bash
npm run dev
```

### Passo 3: Acessar a Aplicação
Abra em seu navegador: **http://localhost:5173**

**Pronto! 🎉**

---

## 📝 USAR A APLICAÇÃO

### 1️⃣ Fazer Login
1. Você será redirecionado para a página de login
2. Digite um email e senha de um usuário existente
3. Clique em "Entrar"

**Se não tem usuário:**
- Vai precisar criar um via API ou banco de dados
- Ou modificar backend para criar usuários de teste

### 2️⃣ Ir para Tarefas
1. Após login, você chegará em `/tasks`
2. Clique em "+ Nova Tarefa" para criar

### 3️⃣ Criar Primeira Tarefa
1. Preencha:
   - **Título**: "Minha primeira tarefa"
   - **Descrição**: "Descrição aqui"
   - **Prioridade**: Escolha uma
   - **Data de Vencimento**: Data futura
2. Clique "Criar"
3. Tarefa aparece no grid

### 4️⃣ Editar Tarefa
1. Clique "✎ Editar" em qualquer tarefa
2. Modifique os dados
3. Clique "Atualizar"

### 5️⃣ Deletar Tarefa
1. Clique "✕ Deletar" em qualquer tarefa
2. Confirme a exclusão
3. Tarefa é removida

### 6️⃣ Marcar Concluída
1. Clique "✓ Concluir" em uma tarefa
2. Status muda para "Concluída"

### 7️⃣ Gerenciar Usuários
1. Clique "Usuários" na navbar
2. Veja lista de usuários
3. Clique "+ Novo Usuário" para criar
4. Preencha nome, email, senha
5. Clique "Criar Usuário"

### 8️⃣ Fazer Logout
1. Clique "Sair" na navbar
2. Será redirecionado para login

---

## ⚙️ CONFIGURAÇÕES

### URL da API
Arquivo: `frontend/src/services/api.ts`

Se backend está em porta diferente, altere:
```typescript
baseURL: 'http://localhost:3000', // Altere conforme necessário
```

### Port do Frontend
Se quer rodar em porta diferente:
```bash
npm run dev -- --port 5174
```

---

## 🐛 ERROS COMUNS

### "Cannot GET /tasks"
❌ **Problema:** Backend não está rodando ou indisponível

✅ **Solução:**
```bash
# Certificar-se que backend está rodando em outra janela/terminal
# Backend deve estar em http://localhost:3000
```

### "Email ou senha inválidos"
❌ **Problema:** Usuário não existe ou credenciais erradas

✅ **Solução:**
1. Criar usuário via API ou database admin
2. Verificar se email e senha estão corretos

### "localStorage is not defined"
❌ **Problema:** Navegador antigo ou modo privado

✅ **Solução:**
- Use navegador moderno (Chrome, Firefox, Safari)
- Desative modo privado

---

## 📱 TESTAR EM MOBILE

### Android/Emulador
```bash
# DevTools no navegador
F12 > Device Toolbar
# Selecione iPhone ou Android
```

### iPhone/iOS
1. Abra DevTools (F12)
2. Device Toolbar (Ctrl+Shift+M)
3. Selecione iPhone

---

## 🎨 DARK MODE (Futuro)

Atualmente usa light mode. Dark mode virá em breve!

---

## 📊 VER O BANCO DE DADOS

Para ver o banco SQLite:
```bash
# No diretório backend
npx prisma studio
```

Isso abre interface para ver dados do database.

---

## 🔐 SEGURANÇA

Dados confidenciais a NUNCA colocar em código:

❌ **Não faça:**
```typescript
const API_KEY = 'sk-1234567890'; // NUNCA!
const PASSWORD = 'admin123'; // NUNCA!
```

✅ **Faça:**
Use variáveis de ambiente:
```
# .env
VITE_API_URL=http://localhost:3000
```

---

## 📚 ARQUIVOS IMPORTANTES

| Arquivo | Propósito |
|---------|-----------|
| `src/pages/Login.tsx` | Tela de login |
| `src/pages/Tasks.tsx` | CRUD de tarefas |
| `src/pages/Users.tsx` | Gerenciar usuários |
| `src/services/api.ts` | Configuração API |
| `src/contexts/AuthContext.tsx` | Autenticação |

---

## 💾 SALVAR TRABALHO

Não esqueça de fazer commit no Git:
```bash
git add .
git commit -m "Frontend funcional"
git push
```

---

## ❓ PERGUNTAS FREQUENTES

### P: Como mudar cores do tema?
R: Edite `src/styles/globals.css`:
```css
:root {
  --primary: #3b82f6; /* Altere esta cor */
}
```

### P: Como adicionar novo formulário?
R: Copie estrutura de `Tasks.tsx` e adapte

### P: Como adicionar nova página?
R: 
1. Crie arquivo em `src/pages/NovaPage.tsx`
2. Adicione rota em `src/routes/AppRoutes.tsx`
3. Adicione link na navbar

### P: Como rodar em produção?
```bash
npm run build
npm run preview
```

### P: Como fazer deploy?
Veja arquivo `PROXIMOS_PASSOS.md` > Deploy

---

## ✅ PRONTO!

Você tem tudo que precisa para:
✅ Rodar o frontend localmente
✅ Testar funcionalidades
✅ Modificar conforme necessário
✅ Preparar para apresentação

---

## 🆘 PRECISA DE AJUDA?

1. Veja `GUIA_TESTES.md` para testes passo a passo
2. Veja `AJUSTES_RAPIDOS.md` para troubleshooting
3. Veja `RESUMO_EXECUTIVO.md` para visão geral

---

**Pronto para começar? Execute `npm run dev` e divirta-se! 🎉**
