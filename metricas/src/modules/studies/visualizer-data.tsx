import React, { useState, useEffect, use } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryGetProgressStages, useQueryGetStudiesById } from '@/queries/studyQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CustomHeader from '@/components/custom-header';
import { useMutationUpdateStudyById } from '@/queries/studyQueries';
import FileUploadDialog from '../../modules/reports/upload-file';
import { toast } from 'sonner';

const VisualizerData: React.FC = () => {
    const location = useLocation();
    const studyId = location.state?.studyId || null;
    const [openFileUploadDialog, setOpenFileUploadDialog] = useState(false);

    // Llamada a la API para obtener los datos del estudio
    const { data } = useQueryGetStudiesById(studyId);
    const mutation = useMutationUpdateStudyById();
    const { data: dataProgress } = useQueryGetProgressStages();
    console.log(data);

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
        observaciones: [],  // Ahora es un array
        progress_stage_id: "" // ID del estado de progreso
    });

    useEffect(() => {
        if (data) {
            setFormData({
                observaciones: data.observaciones || [],
                progress_stage_id: data.progress_stage?.id || ""
            });
        }
    }, [data]);

    const handleUpdateStudy = async () => {
        try {
            await mutation.mutateAsync({
                id: studyId,
                progress_stage_id: formData.progress_stage_id, // ID numérico
                observaciones: formData.observaciones // Array de observaciones
            });
            toast('Actualización exitosa');
        } catch (error) {
            console.error(error);
        }
    };

    if (!data) {
        return <div className="text-center mt-5">Cargando datos...</div>;
    }

    const { id = '', name = '', client = '', start_date = '', end_date = '', quantity = 0, files = [] } = data;

    // Seleccionar el archivo con la fecha más reciente
    const latestFile = files.length > 0
        ? files.reduce((latest, current) => new Date(current.date) > new Date(latest.date) ? current : latest, files[0] || {})
        : null;

    return (
        <div className="max-w-[75%] mx-auto mt-4 p-2">
            <CustomHeader title="Detalles del estudio" />

            {/* Card para los detalles del estudio */}
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
                                    <label className="block font-medium">Lista de Observaciones</label>
                                    <ul className="mt-3 list-disc list-inside">
                                        {data.observaciones && data.observaciones.length > 0 ? (
                                            data.observaciones.map((obs, index) => (
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
                                        value={formData.newObservation || ""}
                                        onChange={(e) => setFormData({ ...formData, newObservation: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <button
                                        type="button"
                                        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                                        onClick={() => {
                                            if (formData.newObservation) {
                                                const newObservation = {
                                                    fecha: new Date().toISOString(), // Fecha actual en formato ISO
                                                    mensaje: formData.newObservation
                                                };
                                                setFormData({
                                                    ...formData,
                                                    observaciones: [...formData.observaciones, newObservation],
                                                    newObservation: "" // Limpiar el campo
                                                });
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
                                            const selectedStage = translatedDataProgress.find(stage => stage.id === parseInt(e.target.value));
                                            setFormData({ ...formData, progress_stage_id: selectedStage?.id || "" });
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Seleccionar estado...</option>
                                        {translatedDataProgress?.map((stage) => (
                                            <option key={stage.id} value={stage.id}>
                                                {stage.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>







                            </div>
                        </div>

                        {/* Archivos subidos */}
                        <div className="mt-6">
                            <label className="block font-medium">Archivos subidos</label>
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
                        </div>


                        {/* Botón de actualización */}
                        <Button className="mt-6" type="button" onClick={handleUpdateStudy}>
                            Actualizar Información
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Card para los archivos */}
            {latestFile ? (
                <Card className='mt-4'>
                    <CardHeader>
                        <CardTitle>Datos del Archivo Más Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Login</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Usuario</TableHead>
                                    <TableHead>Rechazadas</TableHead>
                                    <TableHead>Finalizadas</TableHead>
                                    <TableHead>Tiempo efectivo</TableHead>
                                    <TableHead>Código estudio</TableHead>
                                    <TableHead>Tiempo de conexión</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {latestFile.data?.map((row: { [key: string]: any }, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.Fecha || '-'}</TableCell>
                                        <TableCell>{row.Login || '-'}</TableCell>
                                        <TableCell>{row.Nombre || '-'}</TableCell>
                                        <TableCell>{row.Usuario || '-'}</TableCell>
                                        <TableCell>{row.Rechazadas || '-'}</TableCell>
                                        <TableCell>{row.Finalizadas || '-'}</TableCell>
                                        <TableCell>{row['Tiempo efectivo'] || '-'}</TableCell>
                                        <TableCell>{row['Código estudio'] || '-'}</TableCell>
                                        <TableCell>{row['Tiempo de conexión'] || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Button className="mt-8" type="button" onClick={() => setOpenFileUploadDialog(true)}>
                            Cargar Reporte
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="mt-6">
                    <Card className="p-3">
                        <CardContent>No hay archivos disponibles para este estudio.</CardContent>
                        <Button onClick={() => setOpenFileUploadDialog(true)} className="mt-4">Subir Reporte</Button>
                    </Card>
                </div>
            )}

            {/* Modal para cargar archivos */}
            {openFileUploadDialog && (
                <FileUploadDialog onClose={() => setOpenFileUploadDialog(false)} studyId={studyId} client={client} />
            )}
        </div>
    );
};

export default VisualizerData;