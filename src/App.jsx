import './App.css'
import Login from './Componentes/Login/Login';
import React from 'react';
import { AppRoutes } from './routes/routes'

function App() {
  return (
    <div className="app">
      <p>Página de Login</p>
      <AppRoutes />
    </div>
  );
}

export default App;
