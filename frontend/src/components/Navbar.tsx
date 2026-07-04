import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/tasks" className="navbar-logo">
          📋 Task Manager
        </Link>

        <div className="navbar-menu">
          <Link to="/tasks" className="navbar-link">
            Tarefas
          </Link>
          <Link to="/users" className="navbar-link">
            Usuários
          </Link>
          <span className="navbar-user">Olá, {user?.name}</span>
          <button className="navbar-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
