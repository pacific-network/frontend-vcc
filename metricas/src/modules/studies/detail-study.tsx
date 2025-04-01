import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQueryGetProgressStages, useQueryGetStudiesById, useMutationUpdateStudyById } from '@/queries/studyQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import ConfirmCompleted from "./confirm-completed";

const DetailStudy: React.FC = () => {
    const location = useLocation();
    const studyId = location.state?.studyId || null;

    const { data } = useQueryGetStudiesById(studyId);
    const mutation = useMutationUpdateStudyById();
    const { data: dataProgress } = useQueryGetProgressStages();

    const statusTranslations = {
        "canceled": "Cancelado",
        "completed": "Completado",
        "in_process": "En proceso",
        "in_review": "En revisión",
        "pending": "Pendiente"
    };

    const translatedDataProgress = dataProgress?.map(stage => ({
        id: stage.id,
        name: statusTranslations[stage.name] || stage.name
    })) || [];

    const [formData, setFormData] = useState({
        observaciones: [],
        progress_stage_id: "",
        newObservation: ""
    });


    
            const [showCompletedDialog, setShowCompletedDialog] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                observaciones: data.observaciones || [],
                progress_stage_id: data.progress_stage?.id || "",
                newObservation: ""
            });
        }
    }, [data]);

    const handleUpdateStudy = async () => {
        try {
            await mutation.mutateAsync({
                id: studyId,
                progress_stage_id: formData.progress_stage_id,
                observaciones: formData.observaciones
            });
            toast('Actualización exitosa');
        } catch (error) {
            console.error(error);
        }
    };

    if (!data) {
        return <div className="text-center mt-5">Cargando datos...</div>;
    }

    const { id, name, client, start_date, end_date, quantity, files = [] } = data;

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Información del Estudio</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Columna izquierda */}
                            <div>
                                <div className="mb-4">
                                    <label className="block font-medium">ID</label>
                                    <input
                                        type="text"
                                        value={id}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block font-medium">Nombre</label>
                                    <input
                                        type="text"
                                        value={name}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block font-medium">Cliente</label>
                                    <input
                                        type="text"
                                        value={client}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block font-medium">Fecha de Inicio</label>
                                    <input
                                        type="text"
                                        value={start_date ? new Date(start_date).toLocaleDateString() : ''}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                                    />
                                </div>

                                <div className="mt-6">
                                    <Card>
                                        <CardContent>
                                            <ul className="mt-3 list-disc list-inside">
                                                {files.length > 0 ? (
                                                    files.map((file, index) => (
                                                        <li key={index} className="flex justify-between items-center">
                                                            <span>
                                                                {file.date
                                                                    ? new Date(file.date).toLocaleDateString()
                                                                    : '-'}{' '}
                                                                - {file.code || 'Sin nombre'}
                                                            </span>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p className="mt-2 text-gray-500">No hay archivos subidos.</p>
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Columna derecha */}
                            <div>
                                <div className="mb-4">
                                    <label className="block font-medium">Fecha de Término</label>
                                    <input
                                        type="text"
                                        value={end_date ? new Date(end_date).toLocaleDateString() : ''}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block font-medium">Cantidad</label>
                                    <input
                                        type="text"
                                        value={quantity}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block font-medium">Nueva Observación</label>
                                    <textarea
                                        value={formData.newObservation}
                                        onChange={(e) => setFormData({ ...formData, newObservation: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="Tip: Escribe tu observación y agrégala antes de actualizar"
                                    />
                                    <button
                                        type="button"
                                        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                                        onClick={() => {
                                            if (formData.newObservation) {
                                                const newObservation = {
                                                    fecha: new Date().toISOString(),
                                                    mensaje: formData.newObservation
                                                };
                                                setFormData({
                                                    ...formData,
                                                    observaciones: [...formData.observaciones, newObservation],
                                                    newObservation: ""
                                                });
                                            }
                                        }}
                                    >
                                        Agregar Observación
                                    </button>
                                </div>

                                {/* <div className="mb-4">
                                    <label className="block font-medium">Estado de Progreso</label>
                                    <select
                                        value={formData.progress_stage_id}
                                        onChange={(e) => {
                                            const selectedStage = translatedDataProgress.find(stage => stage.id === parseInt(e.target.value));
                                            setFormData({ ...formData, progress_stage_id: selectedStage?.id || "" });
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Seleccionar estado...</option>
                                        {translatedDataProgress.map((stage) => (
                                            <option key={stage.id} value={stage.id}>
                                                {stage.name}
                                            </option>
                                        ))}

                                    </select>
                                </div> */}

<div className="mb-4">
                                    <label className="block font-medium">Estado de Progreso</label>
                                    <select
                                        value={formData.progress_stage_id}
                                        onChange={(e) => {
                                            const selectedStage = translatedDataProgress.find(stage => stage.id === parseInt(e.target.value));
                                            setFormData({ ...formData, progress_stage_id: selectedStage?.id || "" });

                                            if (selectedStage?.name === "Completado") {
                                                setShowCompletedDialog(true);
                                            }
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Seleccionar estado...</option>
                                        {translatedDataProgress.map((stage) => (
                                            <option key={stage.id} value={stage.id}>
                                                {stage.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {showCompletedDialog && (
                                    <ConfirmCompleted onClose={() => setShowCompletedDialog(false)} />
                                )}

                                <div className="mt-6">
                                    <label className="block font-medium">Observaciones Registradas</label>
                                    <Card>
                                        <CardContent>
                                            <ul className="mt-3 list-disc list-inside">
                                                {formData.observaciones.length > 0 ? (
                                                    formData.observaciones.map((obs, index) => (
                                                        <li key={index} className="flex justify-between items-center">
                                                            <span>
                                                                {obs.fecha ? new Date(obs.fecha).toLocaleDateString() : '-'} - {obs.mensaje || 'Sin descripción'}
                                                            </span>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p className="mt-2 text-gray-500">No hay observaciones registradas.</p>
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>

                        {/* Botón de actualización */}
                        <Button className="mt-6" type="button" onClick={handleUpdateStudy}>
                            Actualizar Información

                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default DetailStudy;