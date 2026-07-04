import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loadUsers() {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createUser() {
    try {
      await api.post('/users', {
        name,
        email,
        password,
      });

      setName('');
      setEmail('');
      setPassword('');

      loadUsers();
    } catch (error) {
      console.error(error);
      alert('Erro ao criar usuário');
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={createUser}>
        Cadastrar
      </button>

      <hr />

      <h2>Lista de usuários</h2>

      {users.map((user) => (
        <div key={user.id}>
          <strong>{user.name}</strong> - {user.email}
        </div>
      ))}
    </div>
  );
}

export default Users;