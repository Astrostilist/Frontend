import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // заглушка, нужно получить путь от бэка и можно указать через env
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, token may be invalid");
      // добавить redirect на /login либо очистить токен
    }
    return Promise.reject(error);
  }
);

export default api;