import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutationCreateUser } from "@/queries/userQueries";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";


const userSchema = z.object({
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    name: z.string().min(1, "El nombre es obligatorio"),
    lastname: z.string().min(1, "El apellido es obligatorio"),
    mail: z.string().email("Correo electrónico no válido"),
    role_id: z.number().min(1, "Rol no válido"),
    status_id: z.number().min(1, "Estado no válido"),
});

type IUser = z.infer<typeof userSchema>

export function UserForm() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<IUser>({
        username: "",
        password: "",
        name: "",
        lastname: "",
        mail: "",
        role_id: 1,
        status_id: 1,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const mutation = useMutationCreateUser({
        onSuccess: () => {
            setOpen(false);  // Cierra el diálogo cuando se crea el usuario
            setUser({
                username: "",
                password: "",
                name: "",
                lastname: "",
                mail: "",
                role_id: 1,
                status_id: 1,
            });  // Limpia los campos del formulario
            toast("Usuario creado exitosamente");
            setErrors({});  // Limpia los errores
        },
        onError: (error) => {
            console.error("Error creando usuario:", error);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: name === "role_id" || name === "status_id" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationResult = userSchema.safeParse(user);
        if (!validationResult.success) {
            const formattedErrors: Record<string, string> = {};
            validationResult.error.issues.forEach((issue) => {
                formattedErrors[issue.path[0]] = issue.message;
            });
            setErrors(formattedErrors);
            return;
        }
        setErrors({});
        mutation.mutate(user);  // Llama a la mutación
    };

    const handleCancel = () => {
        setOpen(false);  // Cierra el diálogo si el usuario cancela
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={'default'}>Crear Usuario</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                        <DialogDescription>Completar formulario para crear usuario</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField id="username" label="Nombre usuario" value={user.username} onChange={handleChange} error={errors.username} />
                        <InputField id="password" label="Contraseña" type="password" value={user.password} onChange={handleChange} error={errors.password} />
                        <InputField id="name" label="Nombre" value={user.name} onChange={handleChange} error={errors.name} />
                        <InputField id="lastname" label="Apellido" value={user.lastname} onChange={handleChange} error={errors.lastname} />
                        <InputField id="mail" label="Email" type="email" value={user.mail} onChange={handleChange} error={errors.mail} />
                        <InputField id="role_id" label="Role" type="number" value={user.role_id} onChange={handleChange} error={errors.role_id} />
                        <InputField id="status_id" label="Status" type="number" value={user.status_id} onChange={handleChange} error={errors.status_id} />
                        <div className="flex justify-center gap-4 mt-8 col-span-2">
                            <Button type="submit" variant="default" className="w-1/3" disabled={mutation.isPending}>Aceptar</Button>
                            <Button type="button" variant="secondary" className="w-1/3" onClick={handleCancel}>Cancelar</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

const InputField: React.FC<{
    id: string;
    label: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}> = ({ id, label, type = "text", value, onChange, error }) => (
    <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} name={id} type={type} value={value} onChange={onChange} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default UserForm;
