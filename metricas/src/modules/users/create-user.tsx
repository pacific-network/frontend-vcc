import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutationCreateUser } from "@/queries/userQueries";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Validación del formulario con Zod
const userSchema = z.object({
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    name: z.string().min(1, "El nombre es obligatorio"),
    lastname: z.string().min(1, "El apellido es obligatorio"),
    mail: z.string().email("Correo electrónico no válido"),
    role_id: z.number().min(1, "Rol no válido"),
    status_id: z.number().min(1, "Estado no válido"),
});

const UserForm: React.FC = () => {
    const [open, setOpen] = useState(false);

    // useForm hook configurado con Zod y valores predeterminados
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: '',
            password: '',
            name: '',
            lastname: '',
            mail: '',
            role_id: 1, // Valor por defecto para el rol
            status_id: 1, // Valor por defecto para el estado
        }
    });

    const { mutate, isLoading } = useMutationCreateUser(); // isLoading para el estado de la mutación

    // Manejo del envío del formulario
    const onSubmit = (data: any) => {
        mutate(data, {
            onSuccess: () => {
                // Resetea los campos después de la creación del usuario
                reset();
                setOpen(false); // Cierra el modal después del éxito
                toast("Usuario creado exitosamente");
            },
            onError: (error) => {
                console.error("Error creando usuario:", error);
                toast("Error al crear usuario");
            },
        }); // Llama a la mutación para crear el usuario
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Crear Usuario</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Nombre de Usuario</Label>
                        <Input {...register("username")} placeholder="Nombre de usuario" />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    <div>
                        <Label>Contraseña</Label>
                        <Input {...register("password")} type="password" placeholder="Contraseña" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div>
                        <Label>Nombre</Label>
                        <Input {...register("name")} placeholder="Nombre" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Label>Apellido</Label>
                        <Input {...register("lastname")} placeholder="Apellido" />
                        {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input {...register("mail")} type="email" placeholder="Correo Electrónico" />
                        {errors.mail && <p className="text-red-500 text-sm">{errors.mail.message}</p>}
                    </div>
                    <div>
                        <Label>Rol</Label>
                        <Controller
                            name="role_id"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={(value) => field.onChange(Number(value))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Admin</SelectItem>
                                        <SelectItem value="2">Usuario</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id.message}</p>}
                    </div>
                    <div>
                        <Label>Estado</Label>
                        <Controller
                            name="status_id"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={(value) => field.onChange(Number(value))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Activo</SelectItem>
                                        <SelectItem value="2">Inactivo</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.status_id && <p className="text-red-500 text-sm">{errors.status_id.message}</p>}
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creando...' : 'Crear Usuario'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserForm;
