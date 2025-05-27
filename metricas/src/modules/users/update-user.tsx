import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useMutationUpdateUser, useQueryGetUserById } from "@/queries/userQueries";

interface UpdateUserProps {
    userId: number;
    onUserUpdated: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const UpdateUser: FC<UpdateUserProps> = ({ userId, onUserUpdated, isOpen, setIsOpen }) => {
    const { data } = useQueryGetUserById(userId);
    const mutation = useMutationUpdateUser();
    const [formData, setFormData] = useState({
        username: "",
        mail: "",
        role_id: 0,
        status_id: 0,
    });

    useEffect(() => {
        if (data) {
            setFormData({
                username: data.username,
                mail: data.mail,
                role_id: data.role_id,
                status_id: data.status_id,
            });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        mutation.mutate(
            {
                id: userId, ...formData,
                password: "",
                name: "",
                lastname: ""
            },
            {
                onSuccess: () => {
                    onUserUpdated();
                    setIsOpen(false);
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>Editar Usuario</DialogHeader>

                <div className="space-y-4">
                    <Input name="username" value={formData.username} onChange={handleChange} placeholder="Nombre de usuario" />
                    <Input name="mail" value={formData.mail} onChange={handleChange} placeholder="Correo" />
                    <Input name="role_id" value={formData.role_id} onChange={handleChange} placeholder="Rol ID" type="number" />
                    <Input name="status_id" value={formData.status_id} onChange={handleChange} placeholder="Estado ID" type="number" />
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit} >
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateUser;
