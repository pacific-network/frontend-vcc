import React, { useState, useEffect } from 'react';
import { useMutationUpdateStudyById, useQueryGetProgressStages, useQueryGetStudiesById } from '@/queries/studyQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DetailStudyProps {
    studyId: string;
}

const DetailStudy: React.FC<DetailStudyProps> = ({ studyId }) => {
    const { data } = useQueryGetStudiesById(studyId);
    const mutation = useMutationUpdateStudyById();
    const { data: dataProgress } = useQueryGetProgressStages();

    const statusTranslations: Record<string, string> = {
        "canceled": "Cancelado",
        "completed": "Completado",
        "in_process": "En proceso",
        "in_review": "En revisión",
        "pending": "Pendiente"
    };

    const translatedDataProgress = dataProgress?.map(stage => ({
        id: stage.id,
        name: statusTranslations[stage.name] || stage.name
    }));

    const [formData, setFormData] = useState({
        observation: '',
        progress_stage: ''
    });

    useEffect(() => {
        if (data) {
            setFormData({
                observation: data.observation || '',
                progress_stage: data.progress_stage || ''
            });
        }
    }, [data]);

    const handleUpdateStudy = async () => {
        try {
            await mutation.mutateAsync({
                id: studyId,
                observation: formData.observation,
                progress_stage: formData.progress_stage
            });
            toast('Actualización exitosa');
        } catch (error) {
            console.error(error);
        }
    };

    if (!data) {
        return <div className="text-center mt-5">Cargando datos...</div>;
    }

    const { id = '', name = '', client = '', start_date = '', end_date = '', quantity = 0 } = data;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Información del Estudio</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <label className="block font-medium">ID</label>
                                <input type="text" value={id} disabled className="w-full p-2 border bg-gray-200" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Nombre</label>
                                <input type="text" value={name} disabled className="w-full p-2 border bg-gray-200" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Cliente</label>
                                <input type="text" value={client} disabled className="w-full p-2 border bg-gray-200" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Fecha de Inicio</label>
                                <input type="text" value={start_date ? new Date(start_date).toLocaleDateString() : ''} disabled className="w-full p-2 border bg-gray-200" />
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block font-medium">Fecha de Término</label>
                                <input type="text" value={end_date ? new Date(end_date).toLocaleDateString() : ''} disabled className="w-full p-2 border bg-gray-200" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Cantidad</label>
                                <input type="text" value={quantity} disabled className="w-full p-2 border bg-gray-200" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Observación</label>
                                <textarea value={formData.observation} onChange={(e) => setFormData({ ...formData, observation: e.target.value })} className="w-full p-2 border" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Estado de Progreso</label>
                                <select value={formData.progress_stage} onChange={(e) => setFormData({ ...formData, progress_stage: e.target.value })} className="w-full p-2 border">
                                    <option value="" disabled>Seleccionar estado...</option>
                                    {translatedDataProgress?.map(stage => (
                                        <option key={stage.id} value={stage.id}>{stage.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <Button className="mt-6" type="button" onClick={handleUpdateStudy}>
                        Actualizar Información
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default DetailStudy;
