import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useQueryGetStudiesById } from '@/queries/studyQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CustomHeader from '@/components/custom-header';

import { FileUploadDialog } from '../../'; // Asegúrate de importar el componente FileUploadDialog

const VisualizerData: React.FC = () => {
    const location = useLocation();
    const studyId = location.state?.studyId || null; // Asegurar un valor por defecto
    const [openFileUploadDialog, setOpenFileUploadDialog] = useState(false); // Estado para controlar el modal

    // Llamada a la API para obtener los datos del estudio
    const { data, error, isLoading } = useQueryGetStudiesById(studyId, {
        enabled: !!studyId, // Solo ejecuta la consulta si studyId es válido
    });

    if (!studyId) {
        return <div>Error: Estudio no encontrado.</div>;
    }

    // Manejo de los estados de carga y error
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error al cargar el estudio</div>;
    }

    // Extraer los datos del estudio
    const { id, name, client, start_date, end_date, quantity, observation, progress_stage, files } = data;

    // Seleccionar el archivo con la fecha más reciente
    const latestFile = files.reduce((latest, current) => {
        if (!latest || new Date(current.date) > new Date(latest.date)) {
            return current;
        }
        return latest;
    }, null);

    return (
        <div className='mt-4'>
            <CustomHeader title="Detalles del estudio" />

            {/* Card para los detalles del estudio */}
            <Card>
                <CardHeader>
                    <CardTitle>Información del Estudio</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="id" className="block font-medium">ID</label>
                                <input
                                    id="id"
                                    type="text"
                                    value={id}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />

                                <label htmlFor="name" className="block font-medium mt-3">Nombre</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />

                                <label htmlFor="client" className="block font-medium mt-3">Cliente</label>
                                <input
                                    id="client"
                                    type="text"
                                    value={client}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />

                                <label htmlFor="start_date" className="block font-medium mt-3">Fecha de Inicio</label>
                                <input
                                    id="start_date"
                                    type="text"
                                    value={new Date(start_date).toLocaleDateString()}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block font-medium">Fecha de Término</label>
                                <input
                                    id="end_date"
                                    type="text"
                                    value={new Date(end_date).toLocaleDateString()}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />

                                <label htmlFor="quantity" className="block font-medium mt-3">Cantidad</label>
                                <input
                                    id="quantity"
                                    type="text"
                                    value={quantity}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />

                                <label htmlFor="observation" className="block font-medium mt-3">Observación</label>
                                <textarea
                                    id="observation"
                                    value={observation || ''}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />

                                <label htmlFor="progress_stage" className="block font-medium mt-3">Estado de Progreso</label>
                                <input
                                    id="progress_stage"
                                    type="text"
                                    value={progress_stage}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <Button className="mt-3" type="submit" disabled>Actualizar Información</Button>
                    </form>
                </CardContent>
            </Card>

            {/* Card para los archivos */}
            {latestFile ? (
                <Card className='mt-5 mb-4'>
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
                                {latestFile.data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.Fecha}</TableCell>
                                        <TableCell>{row.Login}</TableCell>
                                        <TableCell>{row.Nombre}</TableCell>
                                        <TableCell>{row.Usuario}</TableCell>
                                        <TableCell>{row.Rechazadas}</TableCell>
                                        <TableCell>{row.Finalizadas}</TableCell>
                                        <TableCell>{row['Tiempo efectivo']}</TableCell>
                                        <TableCell>{row['﻿Código estudio']}</TableCell>
                                        <TableCell>{row['Tiempo de conexión']}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Button className="mt-8" type="submit">Cargar Reporte</Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="mt-6">
                    <Card className="p-3">
                        <CardContent>No hay archivos disponibles para este estudio.</CardContent>
                    </Card>

                    {/* Mostrar botón para cargar reporte inicial */}
                    <Button className="mt-3" onClick={() => setOpenFileUploadDialog(true)}>
                        Cargar Reporte Inicial
                    </Button>
                </div>
            )}

            {/* Mostrar el diálogo FileUploadDialog cuando no haya archivos */}
            {openFileUploadDialog && <FileUploadDialog onClose={() => setOpenFileUploadDialog(false)} />}
        </div>
    );
};

export default VisualizerData;
