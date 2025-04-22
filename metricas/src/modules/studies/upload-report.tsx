import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import FileUploadDialog from '../../modules/reports/upload-file';
import { useQueryGetStudiesById } from '@/queries/studyQueries';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UploadFile: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Inicializamos el hook de navegación
    const studyId = location.state?.studyId || null;
    const [openFileUploadDialog, setOpenFileUploadDialog] = useState(false);
    const [showFinalizadasAlert, setShowFinalizadasAlert] = useState(false);

    const { data, isLoading } = useQueryGetStudiesById(studyId);

    // Validar que `data` y `data.files` existan antes de proceder
    const latestFile = data?.files && data.files.length > 0
        ? data.files.reduce((latest, current) =>
            new Date(current.date) > new Date(latest.date) ? current : latest, data.files[0])
        : null;

    useEffect(() => {
        // Verificamos si `latestFile` y `data` son válidos antes de proceder
        if (latestFile?.data?.length > 0 && data?.quantity) {
            const lastRow = latestFile.data[latestFile.data.length - 1];
            const finalizadas = parseInt(lastRow?.Finalizadas || '0', 10);
            const quantity = data.quantity;

            if (finalizadas === quantity) {
                setShowFinalizadasAlert(true);
            }
        }
    }, [latestFile, data?.quantity]);

    if (isLoading) return <div>Cargando datos...</div>;
    if (!data) return <div>Error al cargar los datos.</div>;

    const { client } = data;

    // Función para redirigir a la ruta de detalle de facturación
    const handleGoToBilling = () => {
        navigate('/detail-billing', { state: { studyId } });
    };

    return (
        <div className="mt-10">
            <AlertDialog open={showFinalizadasAlert} onOpenChange={setShowFinalizadasAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¡Cuota de estudios alcanzada!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Se ha completado la totalidad de llamadas asignadas para este estudio.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowFinalizadasAlert(false)}>Aceptar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
                                    <TableHead>Tiempo de conexión</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {latestFile.data && latestFile.data.length > 0 ? (
                                    latestFile.data.map((row: { [key: string]: any }, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.Fecha || '-'}</TableCell>
                                            <TableCell>{row.Login || '-'}</TableCell>
                                            <TableCell>{row.Nombre || '-'}</TableCell>
                                            <TableCell>{row.Usuario || '-'}</TableCell>
                                            <TableCell>{row.Rechazadas || '-'}</TableCell>
                                            <TableCell>{row.Finalizadas || '-'}</TableCell>
                                            <TableCell>{row['Tiempo efectivo'] || '-'}</TableCell>
                                            <TableCell>{row['Tiempo de conexión'] || '-'}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center">
                                            No hay datos disponibles.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Button className="mt-8" type="button" onClick={() => setOpenFileUploadDialog(true)}>
                            Cargar Reporte
                        </Button>
                        {/* Botón para ir a detalle de facturación */}
                        <Button variant="secondary" className="mt-4 ml-4" onClick={handleGoToBilling}>
                            Ver Detalle de Facturación
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="mt-6">
                    <Card className="p-3">
                        <CardContent>No hay archivos disponibles para este estudio.</CardContent>
                        <Button onClick={() => setOpenFileUploadDialog(true)} className="mt-4">
                            Subir Reporte
                        </Button>
                    </Card>
                </div>
            )}

            {openFileUploadDialog && (
                <FileUploadDialog
                    onClose={() => setOpenFileUploadDialog(false)}
                    studyId={studyId}
                    client={client}
                />
            )}
        </div>
    );
};

export default UploadFile;
