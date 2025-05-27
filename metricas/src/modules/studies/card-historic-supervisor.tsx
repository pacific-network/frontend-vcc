import React, { useState, useEffect } from 'react';
import { UseQueryGetStudies } from '@/queries/studyQueries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";


const HistoricSupervisor: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const pageSize = 10;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const { data: studiesData } = UseQueryGetStudies(currentPage, pageSize, debouncedSearch);
    const studies = studiesData?.data || [];
    const totalItems = studiesData?.meta.itemCount || 0;
    const totalPages = Math.ceil(totalItems / pageSize); // Calculamos el número total de páginas


    const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <Card className='mt-4 shadow-lg'>
            <CardTitle className="p-2 ml-4">Estudios Completados</CardTitle>
            <div className="size-full p-4 m-2">
                <div className="flex mb-4">
                    <Input
                        type="text"
                        placeholder="Buscar estudio..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md"
                    />
                </div>

                <Card className="mt-4 mr-4 shadow-lg">
                    <CardContent className="p-4">
                        <Table className="table-fixed w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-20">ID</TableHead>
                                    <TableHead className="w-64 truncate">Estudio</TableHead>
                                    <TableHead className="w-64 truncate">Cliente</TableHead>
                                    <TableHead className="w-40 whitespace-nowrap">Fecha Término</TableHead>
                                    <TableHead className="w-40 whitespace-nowrap">Fecha Completado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {studies
                                    .filter(study => study.progress_stage?.id === 4)
                                    .map(study => (
                                        <TableRow key={study.id}>
                                            <TableCell>{study.id}</TableCell>
                                            <TableCell>{study.name}</TableCell>
                                            <TableCell>{study.client}</TableCell>
                                            <TableCell>{study.end_date ? new Date(study.end_date).toLocaleDateString() : "N/A"}</TableCell>
                                            <TableCell>{study.completed_at ? new Date(study.completed_at).toLocaleDateString() : "N/A"}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Paginación */}
                <div className="flex justify-between mt-4">
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="default">
                        Anterior
                    </Button>
                    <Button onClick={handleNextPage} disabled={currentPage >= totalPages} variant="default">
                        Siguiente
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default HistoricSupervisor;
