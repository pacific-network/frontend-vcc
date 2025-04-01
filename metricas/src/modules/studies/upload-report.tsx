import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import FileUploadDialog from '../../modules/reports/upload-file';
import { useQueryGetStudiesById } from '@/queries/studyQueries';

const UploadFile: React.FC = () => {
    const location = useLocation();
    const studyId = location.state?.studyId || null;
    const [openFileUploadDialog, setOpenFileUploadDialog] = useState(false);

    const { data, isLoading } = useQueryGetStudiesById(studyId);

    if (isLoading) {
        return <div>Cargando datos...</div>;
    }

    if (!data) {
        return <div>Error al cargar los datos.</div>;
    }

    const { client, files } = data;

    const latestFile = files.length > 0
        ? files.reduce((latest, current) => new Date(current.date) > new Date(latest.date) ? current : latest, files[0])
        : null;

    return (
        <div className='mt-10'>
            {latestFile ? (
                <Card>
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
                                    {/* <TableHead>Código estudio</TableHead> */}
                                    <TableHead>Tiempo de conexión</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {latestFile?.data?.map((row: { [key: string]: any }, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.Fecha || '-'}</TableCell>
                                        <TableCell>{row.Login || '-'}</TableCell>
                                        <TableCell>{row.Nombre || '-'}</TableCell>
                                        <TableCell>{row.Usuario || '-'}</TableCell>
                                        <TableCell>{row.Rechazadas || '-'}</TableCell>
                                        <TableCell>{row.Finalizadas || '-'}</TableCell>
                                        <TableCell>{row['Tiempo efectivo'] || '-'}</TableCell>
                                        {/* <TableCell>{row['Código estudio'] || '-'}</TableCell> */}
                                        <TableCell>{row['Tiempo de conexión'] || '-'}</TableCell>
                                    </TableRow>
                                )) || (
                                        <TableRow>
                                            <TableCell colSpan={9} className="text-center">
                                                No hay datos disponibles.
                                            </TableCell>
                                        </TableRow>
                                    )}
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

            {openFileUploadDialog && (
                <FileUploadDialog onClose={() => setOpenFileUploadDialog(false)} studyId={studyId} client={client} />
            )}
        </div>
    );
};

export default UploadFile;
