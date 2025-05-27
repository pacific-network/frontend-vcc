import { useLocation } from "react-router-dom";
import {
    useQueryGetProgressStages,
    useQueryGetStudiesById,
    useMutationUpdateStudyById
} from "@/queries/studyQueries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ConfirmCompleted from "./confirm-completed";
import { useEffect, useState } from "react";

interface Observation {
    fecha: string;
    mensaje: string;
}

interface FormData {
    quantity: number | string;
    observaciones: Observation[];
    progress_stage_id: number | string;
    newObservation: string;
}



const DetailStudy: React.FC = () => {
    const location = useLocation();
    const studyId = location.state?.studyId || null;

    const { data } = useQueryGetStudiesById(studyId);
    const mutation = useMutationUpdateStudyById();
    const { data: dataProgress } = useQueryGetProgressStages();

    const statusTranslations: Record<string, string> = {
        canceled: "Cancelado",
        completed: "Completado",
        in_process: "En proceso",
        in_review: "En revisión",
        pending: "Pendiente"
    };

    // Asegúrate de que dataProgress sea un array
    const translatedDataProgress = Array.isArray(dataProgress)
        ? dataProgress.map((stage: { id: number; name: string }) => ({
            id: stage.id,
            name: statusTranslations[stage.name] || stage.name
        }))
        : [];

    const [formData, setFormData] = useState<FormData>({
        quantity: "",
        observaciones: [],
        progress_stage_id: "",
        newObservation: ""
    });

    const [showCompletedDialog, setShowCompletedDialog] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                quantity: data.quantity || "",
                observaciones: data.observaciones || [],
                progress_stage_id: data.progress_stage?.id || "",
                newObservation: ""
            });
        }
    }, [data]);

    const handleUpdateStudy = async () => {
        try {
            // Asegurarse de que progress_stage_id sea un número
            const progressStageId = typeof formData.progress_stage_id === "string"
                ? parseInt(formData.progress_stage_id)
                : formData.progress_stage_id;

            await mutation.mutateAsync({
                id: studyId,
                quantity: formData.quantity,
                progress_stage_id: progressStageId,
                observaciones: formData.observaciones
            });
            toast("Actualización exitosa");
        } catch (error) {
            console.error(error);
            toast("Error al actualizar");
        }
    };

    if (!data) {
        return <div className="text-center mt-5">Cargando datos...</div>;
    }

    const { id, name, client, start_date, end_date, files = [] } = data;

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
                                        value={start_date ? new Date(start_date).toLocaleDateString() : ""}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                                    />
                                </div>

                                <div className="mt-6">
                                    <Card>
                                        <CardContent>
                                            <ul className="mt-3 list-disc list-inside">
                                                {files.length > 0 ? (
                                                    files.map((file: any, index: number) => (
                                                        <li key={index}>
                                                            {file.date ? new Date(file.date).toLocaleDateString() : "-"} -{" "}
                                                            {file.code || "Sin nombre"}
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
                                        value={end_date ? new Date(end_date).toLocaleDateString() : ""}
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block font-medium">Cantidad</label>
                                    <input
                                        type="number"
                                        value={formData.quantity}
                                        onChange={(e) =>
                                            setFormData({ ...formData, quantity: Number(e.target.value) })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block font-medium">Nueva Observación</label>
                                    <textarea
                                        value={formData.newObservation}
                                        onChange={(e) =>
                                            setFormData({ ...formData, newObservation: e.target.value })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="Tip: Escribe tu observación y agrégala antes de actualizar"
                                    />
                                    <button
                                        type="button"
                                        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                                        onClick={() => {
                                            if (formData.newObservation.trim()) {
                                                const newObservation = {
                                                    fecha: new Date().toISOString(),
                                                    mensaje: formData.newObservation
                                                };
                                                setFormData({
                                                    ...formData,
                                                    observaciones: [...formData.observaciones, newObservation],
                                                    newObservation: ""
                                                });
                                            } else {
                                                toast("La observación no puede estar vacía");
                                            }
                                        }}
                                    >
                                        Agregar Observación
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <label className="block font-medium">Estado de Progreso</label>
                                    <select
                                        value={formData.progress_stage_id}
                                        onChange={(e) => {
                                            const selectedId = parseInt(e.target.value);
                                            const selectedStage = translatedDataProgress.find(
                                                (stage: { id: number; name: string }) => stage.id === selectedId
                                            );
                                            setFormData({
                                                ...formData,
                                                progress_stage_id: selectedId
                                            });

                                            if (selectedStage?.name === "Completado") {
                                                setShowCompletedDialog(true);
                                            }
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>
                                            Seleccionar estado...
                                        </option>
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
                                                        <li key={index}>
                                                            {obs.fecha
                                                                ? new Date(obs.fecha).toLocaleDateString()
                                                                : "-"}{" "}
                                                            - {obs.mensaje || "Sin descripción"}
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
