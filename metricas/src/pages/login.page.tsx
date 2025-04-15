import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutationLogin } from "@/queries/authQueries";
import { Eye, EyeOff } from "lucide-react";
import { RestApiService } from "@/services/restApi.service";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getUserRoleFromToken } from "../utils/getUserFromToken"; // Ajusta la ruta según tu estructura de carpetas


// Esquema de validación con Zod
const loginSchema = z.object({
    username: z.string().min(4, { message: "Mínimo 4 caracteres" }),
    password: z.string().min(4, { message: "Mínimo 4 caracteres" }),
});

const Login: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutationLogin();

    const onSubmit = (values: { username: string; password: string }) => {
        mutation.mutate(values, {
            onSuccess: (data) => {
                if (data?.access_token) {
                    login();
                    RestApiService.getInstance().setBackendToken(data.access_token);
                    toast.success("Inicio de sesión exitoso");
                    console.log("Token de autenticación:", data.access_token);

                    // Guardar el token en localStorage
                    localStorage.setItem("access_token", data.access_token);

                    // Usar la función getUserRoleFromToken para obtener el rol
                    const userRole = getUserRoleFromToken();
                    console.log('Role del usuario:', userRole);

                    // Redirigir según el rol
                    if (userRole === 1 || userRole === 2) {
                        setTimeout(() => navigate("/homeAdmin"), 1000);
                    } else if (userRole === 3 || userRole === 4) {
                        setTimeout(() => navigate("/home"), 1000);
                    } else {
                        toast.error("Rol no autorizado.");
                    }
                } else {
                    toast.error("No se recibió un token de autenticación.");
                }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
                console.error("Error en el login:", err);
                if (err?.response?.status === 401) {
                    toast.error("Nombre de usuario o contraseña incorrecta");
                } else {
                    toast.error(err?.message || "Ha ocurrido un error al intentar iniciar sesión.");
                }
            },
        });
    };



    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-96 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center">Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Input {...register("username")} type="text" placeholder="Nombre usuario" />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>
                        <div className="relative">
                            <Input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Contraseña" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Cargando..." : "Ingresar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
