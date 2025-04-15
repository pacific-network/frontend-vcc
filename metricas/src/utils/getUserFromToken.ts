//utils/getUserFromToken.ts

export function getUserRoleFromToken(): number | null {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        const role = decoded.role ?? null; // por ejemplo: 1, 2, 3, 4
        console.log("User role:", role);
        return role;
    } catch (error) {
        console.error("Error decoding token", error);
        return null;
    }
};