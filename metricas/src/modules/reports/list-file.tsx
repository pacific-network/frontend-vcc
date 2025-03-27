import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomHeader from '@/components/custom-header';
import { UseQueryGetStudies } from '@/queries/studyQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from '@/components/ui/input';

const ListStudies: React.FC = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { data: studiesData, isLoading } = UseQueryGetStudies(page, 10);

    const statusTranslations: Record<string, string> = {
        "canceled": "Cancelado",
        "completed": "Completado",
        "in_process": "En proceso",
        "in_review": "En revisión",
        "pending": "Pendiente"
    };

    const columns = [
        'Id',
        'Estudio',
        'Cliente',
        'Estado',
        'Fecha Inicio',
        'Fecha Termino',
        'Acciones'
    ];

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= (studiesData?.meta.pageCount || 1)) {
            setPage(newPage);
        }
    };

    const handleViewDetail = (studyId: number) => {
        navigate('/data-studies', { state: { studyId } });
    };

    // Filtrar estudios por nombre o cliente
    const filteredStudies = studiesData?.data?.filter((study) =>
        study.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.client.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className='size-full p-10'>
            <CustomHeader title="Estudios Activos" />
            <Card>
                <CardHeader>
                    <CardTitle>Listado de Estudios</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Barra de búsqueda */}
                    <div className="mb-4 flex justify-end">
                        <Input
                            type="text"
                            placeholder="Buscar por nombre o cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-80 border p-2"
                        />
                    </div>

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
                            ) : filteredStudies.length > 0 ? (
                                filteredStudies.map((study) => (
                                    <TableRow key={study.id} className="border-b">
                                        <TableCell className="px-4 py-2">{study.id}</TableCell>
                                        <TableCell className="px-4 py-2">{study.name}</TableCell>
                                        <TableCell className="px-4 py-2">{study.client}</TableCell>
                                        <TableCell className="px-4 py-2">
                                            {statusTranslations[study.progress_stage_name] || study.progress_stage_name}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">{new Date(study.start_date).toLocaleDateString()}</TableCell>
                                        <TableCell className="px-4 py-2">{new Date(study.end_date).toLocaleDateString()}</TableCell>
                                        <TableCell className="px-4 py-2 text-center">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleViewDetail(study.id)}
                                            >
                                                Ver Detalle
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="px-4 py-2 text-center text-gray-500">
                                        No se encontraron estudios.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Paginación */}
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
