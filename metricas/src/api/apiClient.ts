import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://localhost:3000/v1", // Cambia esto por tu URL base
    timeout: 10000, // Tiempo de espera en milisegundos
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar tokens automáticamente (si usas autenticación)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Interceptor para manejo de respuestas y errores
apiClient.interceptors.response.use(
    (response) => response.data, // Devuelve solo los datos relevantes
    (error) => {
        // Manejo centralizado de errores
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error.response || error.message);
    }
);

export default apiClient;