import * as React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IUser {
    id: number;
    username: string;
    password: string;
    name: string;
    lastname: string;
    mail: string;
    role_id: number;
    status_id: number;
}

export function UserForm() {
    const [open, setOpen] = React.useState(false);

    const [user, setUser] = React.useState<IUser>({
        id: 0,
        username: "",
        password: "",
        name: "",
        lastname: "",
        mail: "",
        role_id: 1, // Valor por defecto
        status_id: 1, // Valor por defecto
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user); // Aquí puedes manejar la lógica para enviar los datos
    };

    const handleCancel = () => {
        setOpen(false); // Cierra el diálogo cuando se haga clic en "Cancelar"
    };

    const renderForm = () => (
        <div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField id="username" label="Username" value={user.username} onChange={handleChange} />
                <InputField id="password" label="Password" type="password" value={user.password} onChange={handleChange} />
                <InputField id="name" label="Name" value={user.name} onChange={handleChange} />
                <InputField id="lastname" label="Lastname" value={user.lastname} onChange={handleChange} />
                <InputField id="mail" label="Email" type="email" value={user.mail} onChange={handleChange} />
                <InputField id="role_id" label="Role ID" type="number" value={user.role_id} onChange={handleChange} />
                <InputField id="status_id" label="Status ID" type="number" value={user.status_id} onChange={handleChange} />
            </form>
            <div className="flex justify-center gap-4 mt-8">
                <Button type="submit" variant="default" className="w-1/3">Aceptar</Button>
                <Button type="button" variant="secondary" className="w-1/3" onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    );

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
                    {renderForm()}
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
}> = ({ id, label, type = "text", value, onChange }) => (
    <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} name={id} type={type} value={value} onChange={onChange} />
    </div>
);

export default UserForm;
