import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutateCreateClient } from "@/queries/clientQueries";
import { useQueryGetClientCategories } from "@/queries/clientQueries";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const CreateClientForm: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { control, register, handleSubmit, reset } = useForm();
    const { mutate } = useMutateCreateClient();
    const { data: categories } = useQueryGetClientCategories();

    const onSubmit = (data) => {
        mutate(
            { ...data, category_id: Number(data.category_id) },
            {
                onSuccess: () => {
                    reset(); // Limpiar formulario después de enviar
                    setOpen(false); // Cerrar modal
                    toast("Cliente creado existosamente");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Crear Cliente</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Cliente</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Nombre</Label>
                        <Input {...register("name", { required: true })} placeholder="Nombre" />
                    </div>
                    <div>
                        <Label>Teléfono</Label>
                        <Input {...register("contactPhone", { required: true })} placeholder="Teléfono" />
                    </div>
                    <div>
                        <Label>Correo Electrónico</Label>
                        <Input {...register("contactEmail", { required: true })} placeholder="Correo" />
                    </div>
                    <div>
                        <Label>Categoría</Label>
                        <Controller
                            name="category_id"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select onValueChange={(value) => field.onChange(Number(value))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <Button type="submit">Crear Cliente</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateClientForm;
