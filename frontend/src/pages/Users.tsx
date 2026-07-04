import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { userService } from '../services/userService';
import type { User, CreateUserPayload } from '../services/userService';
import '../styles/Users.css';

interface FormData {
  name: string;
  email: string;
  password: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError('Erro ao carregar usuários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Email inválido');
      return;
    }
    if (formData.password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return;
    }

    try {
      const newUser = await userService.createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      } as CreateUserPayload);

      setUsers([...users, newUser]);
      setFormData({ name: '', email: '', password: '' });
      setShowForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar usuário');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', email: '', password: '' });
    setError('');
  };

  return (
    <div className="page">
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>Gerenciamento de Usuários</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) handleCancel();
            }}
          >
            {showForm ? '✕ Cancelar' : '+ Novo Usuário'}
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {showForm && (
          <div className="form-card">
            <h2>Novo Usuário</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Criar Usuário
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading">Carregando usuários...</div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum usuário criado ainda</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Criar Primeiro Usuário
            </button>
          </div>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="user-id">{user.id.substring(0, 8)}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {users.length > 0 && (
          <div className="users-info">
            <p>Total de usuários: <strong>{users.length}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;