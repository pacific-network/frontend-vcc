import React, { useState, useEffect } from 'react';
import { useQueryGetExecutives } from '@/queries/executiveQueries';
import CustomHeader from '@/components/custom-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationItem } from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';
import { IExecutive } from '@/models/Executive';

const ExecutiveList: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 5;

    const { data, isLoading, refetch } = useQueryGetExecutives(currentPage, itemsPerPage, searchQuery);

    const executives: IExecutive[] = data?.data || [];
    const totalItems: number = data?.meta?.itemCount || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        refetch();
    }, [searchQuery, currentPage, refetch]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getContractTypeLabel = (contractType: string) => {
        if (contractType === 'indefinite_term') return 'Indefinido';
        if (contractType === 'fixed_term') return 'Plazo Fijo';
        return 'Otro';
    };

    return (
        <div className="size-full p-10">
            <CustomHeader title="Listado de Ejecutivos" />

            <div className="flex mb-4">
                <Input
                    type="text"
                    placeholder="Buscar ejecutivo..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full max-w-md"
                />
            </div>

            <Card className="w-full">
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-10">Cargando ejecutivos...</div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Rut</TableHead>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Apellido</TableHead>
                                        <TableHead>Salario</TableHead>
                                        <TableHead>Tipo de Contrato</TableHead>
                                        <TableHead>Cantidad de Horas</TableHead>
                                        <TableHead>Fecha de Contratación</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {executives.length > 0 ? (
                                        executives.map((executive) => (
                                            <TableRow key={executive.rut}>
                                                <TableCell>{executive.rut}</TableCell>
                                                <TableCell>{executive.name}</TableCell>
                                                <TableCell>{executive.lastname}</TableCell>
                                                <TableCell>{executive.salary}</TableCell>
                                                <TableCell>{getContractTypeLabel(executive.contract_type)}</TableCell>
                                                <TableCell>{executive.number_of_hours}</TableCell>
                                                <TableCell>{new Date(executive.hiring_date).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center">
                                                No se encontraron ejecutivos
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                            {/* Paginación */}
                            <Pagination className="mt-4">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <PaginationItem
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? 'font-bold' : ''}
                                    >
                                        {index + 1}
                                    </PaginationItem>
                                ))}
                            </Pagination>

                            {/* Botones de anterior/siguiente */}
                            <div className="flex justify-between mt-4">
                                <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    Anterior
                                </Button>
                                <Button variant="outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                    Siguiente
                                </Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => navigate('/executive/create')}>
                    Crear Ejecutivo
                </Button>
            </div>
        </div>
    );
};

export default ExecutiveList;
