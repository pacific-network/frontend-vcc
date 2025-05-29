import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

// Interceptor para agregar tokens y manejar Content-Type
apiClient.interceptors.request.use((config) => {
    const access_token = localStorage.getItem("access_token"); // corregir typo
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }

    // No establecer Content-Type para FormData para que axios lo gestione correctamente
    if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
    } else {
        delete config.headers["Content-Type"];
    }

    return config;
}, (error) => Promise.reject(error));

// Interceptor para manejo de respuestas y errores
apiClient.interceptors.response.use(
    (response) => response.data, // Devuelve solo datos relevantes
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error.response || error.message);
    }
);

export default apiClient;
