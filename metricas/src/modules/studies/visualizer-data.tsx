import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useQueryGetStudiesById } from '@/queries/studyQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CustomHeader from '@/components/custom-header';

import FileUploadDialog from '../../modules/reports/upload-file';

const VisualizerData: React.FC = () => {
    const location = useLocation();
    const studyId = location.state?.studyId || null;
    const [openFileUploadDialog, setOpenFileUploadDialog] = useState(false);

    // Llamada a la API para obtener los datos del estudio
    const { data } = useQueryGetStudiesById(studyId);

    if (!data) {
        return <div className="text-center mt-5">Cargando datos...</div>;
    }

    // Extraer los datos del estudio con valores predeterminados
    const {
        id = '',
        name = '',
        client = '',
        start_date = '',
        end_date = '',
        quantity = 0,
        observation = '',
        progress_stage = '',
        files = [],
    } = data;

    // Seleccionar el archivo con la fecha más reciente
    const latestFile = files.length > 0
        ? files.reduce((latest, current) => new Date(current.date) > new Date(latest.date) ? current : latest, files[0])
        : null;

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
                                <label className="block font-medium">ID</label>
                                <input type="text" value={id} disabled className="w-full p-2 border border-gray-300 rounded-md" />

                                <label className="block font-medium mt-3">Nombre</label>
                                <input type="text" value={name} disabled className="w-full p-2 border border-gray-300 rounded-md" />

                                <label className="block font-medium mt-3">Cliente</label>
                                <input type="text" value={client} disabled className="w-full p-2 border border-gray-300 rounded-md" />

                                <label className="block font-medium mt-3">Fecha de Inicio</label>
                                <input type="text" value={start_date ? new Date(start_date).toLocaleDateString() : ''} disabled className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block font-medium">Fecha de Término</label>
                                <input type="text" value={end_date ? new Date(end_date).toLocaleDateString() : ''} disabled className="w-full p-2 border border-gray-300 rounded-md" />

                                <label className="block font-medium mt-3">Cantidad</label>
                                <input type="text" value={quantity} disabled className="w-full p-2 border border-gray-300 rounded-md" />

                                <label className="block font-medium mt-3">Observación</label>
                                <textarea value={observation} disabled className="w-full p-2 border border-gray-300 rounded-md" />

                                <label className="block font-medium mt-3">Estado de Progreso</label>
                                <input type="text" value={progress_stage} disabled className="w-full p-2 border border-gray-300 rounded-md" />
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
                                {latestFile.data?.map((row, index) => (
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
