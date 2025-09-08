import './App.css'
import Login from './Componentes/Login/Login';
import { Outlet, Navigate } from 'react-router-dom';
import Navb from './Componentes/Navbar';
import useAuth from './context/AuthContext/useAuth';

function App() {
  const { isAuthenticated, user, logout } = useAuth();
  

  return (
    <div className="app">
      <div className="container">
        {isAuthenticated ? <Navb user={user} onLogOut={logout}/> : <p>Favor realizar seu login!</p>}
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
