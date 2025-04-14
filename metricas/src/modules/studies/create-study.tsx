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
import { useNavigate } from "react-router-dom";


const CreateStudyForm: FC = () => {
    const initialFormData = {
        name: "",
        client: "",
        start_date: "",
        end_date: "",
        quantity: '',
        observaciones: [], // Debe ser un array de objetos
        price: '',
        progress_stage_id: 1, // Se asegura que no esté vacío
        is_complete: false, // Nombre corregido
        completed_at: new Date().toISOString().slice(0, 19).replace("T", " "), // Asegura formato ISO 8601
    };

    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();
    const { mutate } = useMutationCreateStudy();
    const { data: clients } = UseQueryGetClients(1, 10);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "quantity" || name === "price" ? Number(value) : value,
        }));
    };

    const handleClientChange = (value: string) => {
        setFormData((prev) => ({ ...prev, client: value }));
    };

    const handleObservationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            observaciones: [{ fecha: new Date().toISOString(), mensaje: value }],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            quantity: Number(formData.quantity),
            price: Number(formData.price),
        };

        mutate(payload, {
            onSuccess: () => {
                setFormData(initialFormData);
                toast("Estudio creado exitosamente");
                navigate("/list");
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
                            </SelectTrigger>
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
                        <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Cantidad de contactos" required />
                        <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Valor encuesta" required />
                        <Textarea name="observaciones" onChange={handleObservationChange} placeholder="Observaciones" rows={3} />

                        <Button type="submit" className="w-full">Enviar</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateStudyForm;
