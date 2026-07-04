# AJUSTES RÁPIDOS - Se Necessário

Este arquivo contém correções rápidas se o frontend não funcionar exatamente como esperado.

---

## ❌ Problema: "POST /auth/login retorna erro 400"

**Possível Causa:** Backend espera formato diferente

**Solução:**
Editar `src/services/authService.ts`:
```typescript
login: async (email: string, password: string): Promise<LoginResponse> => {
  // Se backend retorna formato diferente, mapear aqui
  const response = await api.post('/auth/login', { email, password });
  // Adaptar conforme necessário
  const { access_token, user } = response.data;
  localStorage.setItem('token', access_token);
  return response.data;
},
```

---

## ❌ Problema: "Token não está sendo enviado em requisições"

**Possível Causa:** Interceptador não está funcionando

**Solução:**
Verificar `src/services/api.ts` e garantir que está correto:
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## ❌ Problema: "Rota /tasks redireciona para login mesmo autenticado"

**Possível Causa:** AuthContext não está verificando corretamente

**Solução:**
Verificar `src/contexts/AuthContext.tsx`:
```typescript
useEffect(() => {
  const checkAuth = async () => {
    if (authService.isAuthenticated()) {
      try {
        const profile = await authService.getProfile();
        setUser(profile);
        setUserId(profile.id);
      } catch (error) {
        console.error('Erro:', error);
        authService.logout();
      }
    }
    setIsLoading(false);
  };
  checkAuth();
}, []);
```

---

## ❌ Problema: "Tarefas não aparecem na lista"

**Possível Causa:** Endpoint retorna array vazio ou formato diferente

**Solução 1:** Verificar console (F12) para ver resposta da API
```typescript
// No Tasks.tsx, adicionar log
const data = await taskService.getTasks();
console.log('Tasks recebidas:', data);
setTasks(data);
```

**Solução 2:** Se formato diferente, adaptar em `src/services/taskService.ts`

---

## ❌ Problema: "Criar tarefa retorna erro sobre userId"

**Possível Causa:** userId não está sendo enviado ou está null

**Solução:**
Verificar em `src/pages/Tasks.tsx`:
```typescript
const { userId } = useAuth();

const handleSubmit = async (e) => {
  // Adicionar validação
  if (!userId) {
    setError('Usuário não identificado');
    return;
  }
  // ... resto do código
};
```

---

## ❌ Problema: "Erro ao editar tarefa com dueDate"

**Possível Causa:** Formato de data está errado

**Solução:**
Verificar formato da data em `src/pages/Tasks.tsx`:
```typescript
const handleEdit = (task: Task) => {
  setFormData({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate.split('T')[0], // Isso deve dar YYYY-MM-DD
  });
};
```

---

## ❌ Problema: "Status não está mudando quando marca como concluída"

**Possível Causa:** Backend espera valor diferente para status

**Solução:**
Verificar se status COMPLETED está correto no backend. Se for diferente, adaptar em `src/services/taskService.ts`:
```typescript
completeTask: async (id: string): Promise<Task> => {
  // Adaptar se backend usa valor diferente
  const response = await api.patch(`/tasks/${id}/complete`);
  return response.data;
},
```

---

## ❌ Problema: "Navbar não aparece depois de login"

**Possível Causa:** isAuthenticated está false

**Solução:**
Verificar em `src/components/Navbar.tsx`:
```typescript
export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  
  // Debug
  console.log('isAuthenticated:', isAuthenticated);
  console.log('user:', user);
  
  if (!isAuthenticated) {
    return null;
  }
  // ... resto do código
}
```

---

## ❌ Problema: "localStorage não está sendo preenchido"

**Possível Causa:** Token não é retornado pelo backend

**Solução:**
Verificar resposta do login em `src/services/authService.ts`:
```typescript
login: async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  console.log('Response:', response.data); // Debug
  
  // Se token está em local diferente, adaptar
  const { access_token } = response.data;
  localStorage.setItem('token', access_token);
  
  return response.data;
},
```

---

## ❌ Problema: "Logout não funciona"

**Possível Causa:** Estado não está sendo limpo

**Solução:**
Verificar em `src/contexts/AuthContext.tsx`:
```typescript
const logout = () => {
  authService.logout();
  setUser(null);
  setUserId(null);
  // Forçar redirecionamento
  window.location.href = '/';
};
```

---

## ❌ Problema: "Usuários não aparecem em lista"

**Possível Causa:** Endpoint /users retorna erro ou formato diferente

**Solução:**
Verificar console e adaptar em `src/services/userService.ts`:
```typescript
getUsers: async (): Promise<User[]> => {
  const response = await api.get('/users');
  console.log('Users response:', response.data); // Debug
  
  // Se é array dentro de propriedade, extrair
  return Array.isArray(response.data) ? response.data : response.data.users;
},
```

---

## ❌ Problema: "Criar usuário não funciona"

**Possível Causa:** Validações no backend ou formato diferente

**Solução:**
Tentar criar com dados válidos em `src/pages/Users.tsx`:
```typescript
const handleSubmit = async (e) => {
  // Validações frontend
  if (!formData.name.trim()) {
    setError('Nome é obrigatório');
    return;
  }
  // ... validações
  
  try {
    // Debug
    console.log('Enviando:', {
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    const newUser = await userService.createUser({...});
  } catch (err) {
    console.error('Error:', err.response?.data); // Mensagem do backend
    setError(err.response?.data?.message || 'Erro ao criar usuário');
  }
};
```

---

## ⚠️ VERIFICAÇÕES DE DEBUG

Se algo não funcionar, fazer estas verificações:

1. **Console do Navegador (F12)**
   - Procurar por erros
   - Ver respostas das APIs
   - Verificar se localStorage tem token

2. **Network Tab (F12)**
   - Verificar requisições
   - Ver respostas do servidor
   - Verificar headers

3. **Verificar Backend**
   - Backend está rodando? `http://localhost:3000`
   - Database inicializado?
   - Usuários existem no banco?

4. **localStorage**
   - DevTools > Application > LocalStorage
   - Verificar se token está lá
   - Limpar se necessário

---

## 🔧 RECONSTRUIR TUDO DO ZERO

Se tudo falhar, reconstruir:

```bash
# 1. Limpar
rm -rf node_modules package-lock.json

# 2. Reinstalar
npm install

# 3. Limpar cache
npm cache clean --force

# 4. Reiniciar
npm run dev

# 5. Limpar localStorage
# DevTools > Application > Clear Storage
```

---

## 📞 LOGS ÚTEIS PARA DEBUG

Adicionar estes logs temporariamente:

### Em AuthContext.tsx
```typescript
console.log('AuthContext - Verificando autenticação...');
console.log('Token:', authService.getToken());
console.log('User:', user);
console.log('IsLoading:', isLoading);
```

### Em AppRoutes.tsx
```typescript
console.log('Routes renderizadas');
```

### Em Tasks.tsx
```typescript
console.log('Tasks page - userId:', userId);
console.log('Tasks:', tasks);
```

### Em api.ts
```typescript
api.interceptors.request.use((config) => {
  console.log('Request:', config.url, config.data);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data);
    return response;
  }
);
```

---

## 🚀 APÓS CORRIGIR

Sempre fazer:

1. Limpar console
2. Remover logs de debug
3. Testar tudo novamente
4. Commit no Git

---

**Lembre-se:** Se um ajuste funciona, documente-o para referência futura!
