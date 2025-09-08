import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './main.css'
import App from './App'
import Home from './routes/Home';
import Usuario from './routes/Usuario';
import Auth from './routes/Auth';
import PrivateRoute from './routes/PrivateRoute';
import AuthProvider from './context/AuthContext/AuthProvider';
import { ContaProvider } from "./context/ContaContext/ContaProvider";

const Conta = lazy(() => import("./routes/Conta"));
const Movimentacao = lazy(() => import("./routes/Movimentacao"));
const Metas = lazy(() => import("./routes/Metas"));
const CartInvest = lazy(() => import("./routes/CartInvest"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: ( <PrivateRoute> <Home /> </PrivateRoute>)
      },
      {
        path: "/auth",
        element: <Auth />,
         children: [
          {
            path: "signin", // Isso se tornará /auth/signin
            element: <Auth />
          },
          {
            path: "signup", // Isso se tornará /auth/signup
            element: <Auth />
          }
        ]
      },
      {
        path: "/user",
        element: (<PrivateRoute> <Usuario /> </PrivateRoute>)
      },
      {
        path: "/conta",
        element: (
          <PrivateRoute>
            <Suspense fallback={<p>Carregando...</p>}>
              <Conta />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/mov",
        element: (
          <PrivateRoute>
            <Suspense fallback={<p>Carregando...</p>}>
              <Movimentacao />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/metas",
        element: (
          <PrivateRoute>
            <Suspense fallback={<p>Carregando...</p>}>
              <Metas />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/invest",
        element: (
          <PrivateRoute>
            <Suspense fallback={<p>Carregando...</p>}>
              <CartInvest />
            </Suspense>
          </PrivateRoute>
        ),
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ContaProvider>
        <RouterProvider router={router}/>
      </ContaProvider>
    </AuthProvider>
  </StrictMode>
)
