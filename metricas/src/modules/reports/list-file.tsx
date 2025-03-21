import React, { useState } from 'react';
import CustomHeader from '@/components/custom-header';
import { UseQueryGetStudies } from '@/queries/studyQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Asegúrate de importar el componente Button
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CreateStudyForm from '../studies/create-study';

const ListStudies: React.FC = () => {
    const [page, setPage] = useState(1); // Estado para la página actual
    const { data: studiesData, isLoading } = UseQueryGetStudies(page, 10);

    const columns = [
        'Id',
        'Estudio',
        'Cliente',
        'Estado',
        'Fecha Inicio',
        'Fecha Termino',

    ];

    // Función para manejar el cambio de página
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= studiesData?.meta.pageCount) {
            setPage(newPage);
        }
    };

    const handleViewDetail = (studyId: number) => {
        // Aquí podrías redirigir a otra página o abrir un modal para mostrar más detalles
        console.log('Ver detalles del estudio con id:', studyId);
    };

    return (
        <div className='size-full p-10'>
            <CustomHeader title="Estudios Activos" />
            <Card>
                <CardHeader>
                    <CardTitle>Listado de Estudios</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableHead key={index} className="px-4 py-2 text-left font-semibold border-b">
                                        {column}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="px-4 py-2 text-center text-gray-500">
                                        Cargando...
                                    </TableCell>
                                </TableRow>
                            ) : (
                                studiesData?.data?.map((study) => (
                                    <TableRow key={study.id} className="border-b">
                                        <TableCell className="px-4 py-2">{study.id}</TableCell>
                                        <TableCell className="px-4 py-2">{study.name}</TableCell>
                                        <TableCell className="px-4 py-2">{study.client}</TableCell>
                                        <TableCell className="px-4 py-2">{study.progress_stage}</TableCell>
                                        <TableCell className="px-4 py-2">{new Date(study.start_date).toLocaleDateString()}</TableCell>
                                        <TableCell className="px-4 py-2">{new Date(study.end_date).toLocaleDateString()}</TableCell>
                                        <TableCell className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleViewDetail(study.id)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Ver Detalle
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {/* Paginación con el diseño solicitado */}
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                        >
                            Anterior
                        </Button>
                        <span>
                            Página {page} de {studiesData?.meta.pageCount}
                        </span>
                        <Button
                            variant="outline"
                            disabled={page >= studiesData?.meta.pageCount}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            Siguiente
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ListStudies;
