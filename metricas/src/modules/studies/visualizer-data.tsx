import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/pages/layout.page';
import { useQueryGetStudiesById } from '@/queries/studyQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CustomHeader from '@/components/custom-header';

const VisualizerData: React.FC = () => {
    const location = useLocation();
    const studyId = location.state?.studyId;

    // Asegúrate de que studyId esté presente
    if (!studyId) {
        return <div>Error: Estudio no encontrado.</div>;
    }

    // Llamada a la API para obtener los datos del estudio
    const { data, error, isLoading } = useQueryGetStudiesById(studyId);

    // Manejo de los estados de carga y error
    if (isLoading) {
        return <div>Loading...</div>;  // Mostrar un mensaje de carga
    }

    if (error) {
        return <div>Error al cargar el estudio</div>;  // Mostrar un mensaje de error
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
        <div className="size-full p-10">
            <CustomHeader title="Detalles del estudio" />

            {/* Card para los detalles del estudio */}
            <Card>
                <CardHeader>
                    <CardTitle>Información del Estudio</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p><strong>ID:</strong> {id}</p>
                                <p><strong>Nombre:</strong> {name}</p>
                                <p><strong>Cliente:</strong> {client}</p>
                                <p><strong>Fecha de Inicio:</strong> {new Date(start_date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p><strong>Fecha de Término:</strong> {new Date(end_date).toLocaleDateString()}</p>
                                <p><strong>Cantidad:</strong> {quantity}</p>
                                <p><strong>Observación:</strong> {observation || 'Sin observaciones'}</p>
                                <p><strong>Estado de Progreso:</strong> {progress_stage}</p>
                            </div>
                        </div>
                        <Button className="mt-4" type="submit">Actualizar Información</Button>
                    </form>
                </CardContent>
            </Card>

            {/* Card para los archivos */}
            {latestFile ? (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Datos del Archivo Más Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table className="table-auto text-sm border-collapse">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="p-2">Fecha</TableHead>
                                        <TableHead className="p-2">Login</TableHead>
                                        <TableHead className="p-2">Nombre</TableHead>
                                        <TableHead className="p-2">Usuario</TableHead>
                                        <TableHead className="p-2">Rechazadas</TableHead>
                                        <TableHead className="p-2">Finalizadas</TableHead>
                                        <TableHead className="p-2">Test rechazado</TableHead>
                                        <TableHead className="p-2">Rechazadas e.c.</TableHead>
                                        <TableHead className="p-2">Test finalizado</TableHead>
                                        <TableHead className="p-2">Tiempo efectivo</TableHead>
                                        <TableHead className="p-2">Finalizadas e.c.</TableHead>
                                        <TableHead className="p-2">Código estudio</TableHead>
                                        <TableHead className="p-2">Tiempo de conexión</TableHead>
                                        <TableHead className="p-2">Efectivo en segundos</TableHead>
                                        <TableHead className="p-2">Conexión en segundos</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {latestFile.data.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="p-2">{row.Fecha}</TableCell>
                                            <TableCell className="p-2">{row.Login}</TableCell>
                                            <TableCell className="p-2">{row.Nombre}</TableCell>
                                            <TableCell className="p-2">{row.Usuario}</TableCell>
                                            <TableCell className="p-2">{row.Rechazadas}</TableCell>
                                            <TableCell className="p-2">{row.Finalizadas}</TableCell>
                                            <TableCell className="p-2">{row['Test rechazado']}</TableCell>
                                            <TableCell className="p-2">{row['Rechazadas e.c.']}</TableCell>
                                            <TableCell className="p-2">{row['Test finalizado']}</TableCell>
                                            <TableCell className="p-2">{row['Tiempo efectivo']}</TableCell>
                                            <TableCell className="p-2">{row['Finalizadas e.c.']}</TableCell>
                                            <TableCell className="p-2">{row['﻿Código estudio']}</TableCell>
                                            <TableCell className="p-2">{row['Tiempo de conexión']}</TableCell>
                                            <TableCell className="p-2">{row['Efectivo en segundos']}</TableCell>
                                            <TableCell className="p-2">{row['Conexión en segundos']}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="mt-6">
                    <CardContent>No hay archivos disponibles para este estudio.</CardContent>
                </Card>
            )}
        </div>
    );
};

export default VisualizerData;
