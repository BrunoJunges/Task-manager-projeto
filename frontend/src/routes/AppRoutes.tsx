import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Users from '../pages/Users';
import Tasks from '../pages/Tasks';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;