import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('access_token');

if (token) {
    const decodedToken: any = jwtDecode(token); // Usa tipo adecuado si tienes una interfaz
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        localStorage.removeItem('access_token');
        // Redirigir al login si lo deseas
    } else {
        // Token válido
        // Establecer estado autenticado
    }
} else {
    // No hay token, redirigir al login
}
