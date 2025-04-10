import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('access_token');

if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Tiempo en segundos

    // Verificar si el token ha expirado
    if (decodedToken.exp < currentTime) {
        // Si ha expirado, eliminar el token
        localStorage.removeItem('access_token');
        // Aquí rediriges al login
    } else {
        // El token es válido
        // Puedes cargar el estado autenticado
    }
} else {
    // No hay token, redirigir al login
}
