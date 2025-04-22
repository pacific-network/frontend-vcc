import axios, { AxiosInstance } from 'axios';
import { baseUrl } from '@/constants/roles';



export class RestApiService {
    public http: AxiosInstance;
    private static _instance: RestApiService;

    private constructor() {
        this.http = axios.create({
            baseURL: baseUrl,
            timeout: 15_000, // 15 segundos
        });

        // Agregar interceptor para manejar el token dinámicamente
        this.http.interceptors.request.use((config) => {
            const token = localStorage.getItem('access_token'); // Obtener token
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            // ✅ No sobrescribimos 'Content-Type' si es FormData
            if (!(config.data instanceof FormData)) {
                config.headers['Content-Type'] = 'application/json';
            }
            return config;
        });
    }

    public static getInstance(): RestApiService {
        if (!RestApiService._instance) {
            RestApiService._instance = new RestApiService();
        }
        return RestApiService._instance;
    }

    // Método opcional para actualizar el token sin necesidad de reiniciar la instancia
    public setBackendToken(access_token: string) {
        localStorage.setItem('access_token', access_token); // Guardar token
    }
}