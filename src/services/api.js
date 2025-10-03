import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3030",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token && !config.url.includes('/auth/')) {
        config.headers.Authorization = `Bearer ${token}`;
        
    }

    console.log("Enviando requisição para:", config.url, "com token:", !!token);

    return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      console.warn("Token inválido ou expirado, redirecionando para login...");

      //localStorage.removeItem("token");
      //localStorage.removeItem("usuario");

      //window.dispatchEvent(new Event("storage"));

      //window.dispatchEvent(new Event("invalidToken"));

      if(status === 401 && error.config.url.includes('auth/') ) {
      //window.location.href = "/auth/signin"; // ajuste conforme sua rota

      // if (window.location.pathname.startsWith("/auth")) {
      //   window.location.href = "/auth";
      // }
      }

      if(status === 403) {
        console.warn("Acesso negado - 403");
      }

    }
    return Promise.reject(error);
    }
);

export default api;