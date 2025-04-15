import React, { useState, useEffect } from 'react';
import { UseQueryGetStudies } from '@/queries/studyQueries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CustomHeader from '@/components/custom-header';
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { getUserRoleFromToken } from '@/utils/getUserFromToken'; // 👈 importa la función

const HistoricList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [userRole, setUserRole] = useState<number | null>(null); // 👈 estado para el rol
    const navigate = useNavigate();

    const pageSize = 10;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        const role = getUserRoleFromToken();
        setUserRole(role); // 👈 actualiza el rol al montar el componente
    }, []);

    const { data: studiesData } = UseQueryGetStudies(currentPage, pageSize, debouncedSearch);
    const studies = studiesData?.data || [];
    const totalItems = studiesData?.meta.itemCount || 0;

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < Math.ceil(totalItems / pageSize) && setCurrentPage(currentPage + 1);

    const handleDetailClick = (studyId: number) => {
        navigate('/detail-billing', { state: { studyId } });
    };

    return (
        <div className="size-full p-10">
            <CustomHeader title="Estudios Completados" />

            <div className="flex mb-4">
                <Input
                    type="text"
                    placeholder="Buscar estudio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md"
                />
            </div>

            <Card className="mt-4 shadow-lg">
                <CardContent className="p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Estudio</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Fecha Termino</TableHead>
                                <TableHead>Fecha Completado</TableHead>
                                <TableHead>Acciones</TableHead>
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
                                        <TableCell>
                                            {(userRole === 1 || userRole === 2) && (
                                                <Button variant="outline" onClick={() => handleDetailClick(study.id)}>
                                                    Ver Detalle
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </CardContent>
            </Card>

            <div className="flex justify-between mt-4">
                <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="default">
                    Anterior
                </Button>
                <Button onClick={handleNextPage} disabled={currentPage >= Math.ceil(totalItems / pageSize)} variant="default">
                    Siguiente
                </Button>
            </div>
        </div>
    );
};

export default HistoricList;
