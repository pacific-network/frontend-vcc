import { useState } from "react";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomHeader from "@/components/custom-header";
import { useMutationCreateStudy } from "@/queries/studyQueries";
import { toast } from "sonner";
import { UseQueryGetClients } from "@/queries/clientQueries";

const CreateStudyForm: FC = () => {
    const initialFormData = {
        name: "",
        client: "",
        start_date: "",
        end_date: "",
        quantity: "",
        observation: "",
        price: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const { mutate } = useMutationCreateStudy();
    const { data: clients } = UseQueryGetClients(1, 10);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" ? Number(value) : value, // Convierte quantity a número
        });
    };

    const handleClientChange = (value: string) => {
        setFormData({
            ...formData,
            client: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            quantity: Number(formData.quantity), // Asegurar que sea número
            progress_stage: "en progreso", // Valor por defecto
        };
        mutate(payload, {
            onSuccess: () => {
                setFormData(initialFormData);
                toast("Estudio creado exitosamente"); // Resetea el formulario después de un envío exitoso
            },
        });
    };

    return (
        <div className="size-full p-10">
            <CustomHeader title="Crear Nuevo Estudio" />
            <Card>
                <CardHeader>
                    <CardTitle>Completa el formulario</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />

                        <Select onValueChange={handleClientChange} value={formData.client}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona un cliente" />
                            </SelectTrigger >
                            <SelectContent>
                                {clients?.data?.map((client) => (
                                    <SelectItem key={client.id} value={client.name}>
                                        {client.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
                        <Input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
                        <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Cantidad de contactos a realizar" required />
                        <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Valor encuesta" required />
                        <Textarea name="observation" value={formData.observation} onChange={handleChange} placeholder="Observaciones" rows={3} required />
                        <Button type="submit" className="w-full">Enviar</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateStudyForm;
