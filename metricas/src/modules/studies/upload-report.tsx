// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
// import FileUploadDialog from '../../modules/reports/upload-file';

// interface UploadFileProps {
//     studyId: string | null;
//     files: any[];
// }

// const UploadFile: React.FC<UploadFileProps> = ({ studyId, files }) => {
//     const [openFileUploadDialog, setOpenFileUploadDialog] = useState(false);

//     const latestFile = files.length > 0
//         ? files.reduce((latest, current) => new Date(current.date) > new Date(latest.date) ? current : latest, files[0])
//         : null;

//     return (
//         <div>
//             {latestFile ? (
//                 <Card className='mt-4'>
//                     <CardHeader>
//                         <CardTitle>Datos del Archivo Más Reciente</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Fecha</TableHead>
//                                     <TableHead>Login</TableHead>
//                                     <TableHead>Nombre</TableHead>
//                                     <TableHead>Usuario</TableHead>
//                                     <TableHead>Rechazadas</TableHead>
//                                     <TableHead>Finalizadas</TableHead>
//                                     <TableHead>Tiempo efectivo</TableHead>
//                                     <TableHead>Código estudio</TableHead>
//                                     <TableHead>Tiempo de conexión</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {latestFile.data?.map((row: any, index: number) => (
//                                     <TableRow key={index}>
//                                         <TableCell>{row.Fecha || '-'}</TableCell>
//                                         <TableCell>{row.Login || '-'}</TableCell>
//                                         <TableCell>{row.Nombre || '-'}</TableCell>
//                                         <TableCell>{row.Usuario || '-'}</TableCell>
//                                         <TableCell>{row.Rechazadas || '-'}</TableCell>
//                                         <TableCell>{row.Finalizadas || '-'}</TableCell>
//                                         <TableCell>{row['Tiempo efectivo'] || '-'}</TableCell>
//                                         <TableCell>{row['Código estudio'] || '-'}</TableCell>
//                                         <TableCell>{row['Tiempo de conexión'] || '-'}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>

//                         <Button className="mt-8" type="button" onClick={() => setOpenFileUploadDialog(true)}>
//                             Cargar Reporte
//                         </Button>
//                     </CardContent>
//                 </Card>
//             ) : (
//                 <Card className="mt-6 p-3">
//                     <CardContent>No hay archivos disponibles para este estudio.</CardContent>
//                     <Button onClick={() => setOpenFileUploadDialog(true)} className="mt-4">Subir Reporte</Button>
//                 </Card>
//             )}


//         </div>
//     );
// };

// export default UploadFile;
