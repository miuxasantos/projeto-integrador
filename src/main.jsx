import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './main.css'
import App from './App'
import Home from './routes/Home';
import Usuario from './routes/Usuario';
import Conta from './routes/Conta';
import Movimentacao from './routes/Movimentacao';
import Metas from './routes/Metas';
import CartInvest from './routes/CartInvest';
import Auth from './routes/Auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/user",
        element: <Usuario />
      },
      {
        path: "/conta",
        element: <Conta />
      },
      {
        path: "/mov",
        element: <Movimentacao />
      },
      {
        path: "/metas",
        element: <Metas />
      },
      {
        path: "/invest",
        element: <CartInvest />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
