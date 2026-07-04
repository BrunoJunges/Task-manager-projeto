import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { taskService } from '../services/taskService';
import type { Task, CreateTaskPayload, UpdateTaskPayload } from '../services/taskService';
import '../styles/Tasks.css';

interface FormData {
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
}

function Tasks() {
  const { userId } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priority: 'MEDIUM',
    dueDate: '',
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err: any) {
      setError('Erro ao carregar tarefas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userId) {
      setError('Usuário não identificado');
      return;
    }

    if (!formData.dueDate) {
      setError('Data de vencimento é obrigatória');
      return;
    }

    try {
      if (editingId) {
        // Atualizar tarefa
        const updatedTask = await taskService.updateTask(editingId, {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          dueDate: formData.dueDate,
        } as UpdateTaskPayload);
        setTasks(tasks.map((t) => (t.id === editingId ? updatedTask : t)));
        setEditingId(null);
      } else {
        // Criar nova tarefa
        const newTask = await taskService.createTask({
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          dueDate: formData.dueDate,
          userId: userId,
        } as CreateTaskPayload);
        setTasks([...tasks, newTask]);
      }

      setFormData({ title: '', description: '', priority: 'MEDIUM', dueDate: '' });
      setShowForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao salvar tarefa');
      console.error(err);
    }
  };

  const handleEdit = (task: Task) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate.split('T')[0], // Converter para formato YYYY-MM-DD
    });
    setEditingId(task.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return;

    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err: any) {
      setError('Erro ao deletar tarefa');
      console.error(err);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const completedTask = await taskService.completeTask(id);
      setTasks(tasks.map((t) => (t.id === id ? completedTask : t)));
    } catch (err: any) {
      setError('Erro ao completar tarefa');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', description: '', priority: 'MEDIUM', dueDate: '' });
  };

  const getPriorityClass = (priority: string) => {
    return `badge priority-${priority.toLowerCase()}`;
  };

  const getStatusClass = (status: string) => {
    return `badge status-${status.toLowerCase().replace('_', '-')}`;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>Gerenciamento de Tarefas</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) handleCancel();
            }}
          >
            {showForm ? '✕ Cancelar' : '+ Nova Tarefa'}
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {showForm && (
          <div className="form-card">
            <h2>{editingId ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título da tarefa"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição da tarefa"
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priority">Prioridade</label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' })
                    }
                  >
                    <option value="LOW">Baixa</option>
                    <option value="MEDIUM">Média</option>
                    <option value="HIGH">Alta</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dueDate">Data de Vencimento</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Atualizar' : 'Criar'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading">Carregando tarefas...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma tarefa criada ainda</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Criar Primeira Tarefa
            </button>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <div className="task-badges">
                    <span className={getPriorityClass(task.priority)}>
                      {task.priority === 'LOW' ? 'Baixa' : task.priority === 'MEDIUM' ? 'Média' : 'Alta'}
                    </span>
                    <span className={getStatusClass(task.status)}>
                      {task.status === 'PENDING' ? 'Pendente' : task.status === 'IN_PROGRESS' ? 'Em Progresso' : 'Concluída'}
                    </span>
                  </div>
                </div>

                <p className="task-description">{task.description}</p>

                <div className="task-meta">
                  <small>Vencimento: {formatDate(task.dueDate)}</small>
                  {task.user && <small> • Por: {task.user.name}</small>}
                </div>

                <div className="task-actions">
                  {task.status !== 'COMPLETED' && (
                    <button
                      className="btn btn-small btn-success"
                      onClick={() => handleComplete(task.id)}
                      title="Marcar como concluída"
                    >
                      ✓ Concluir
                    </button>
                  )}
                  <button className="btn btn-small btn-warning" onClick={() => handleEdit(task)} title="Editar">
                    ✎ Editar
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDelete(task.id)}
                    title="Deletar"
                  >
                    ✕ Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;