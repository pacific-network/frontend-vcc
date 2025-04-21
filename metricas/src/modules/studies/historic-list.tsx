import React, { useState, useEffect } from 'react';
import { UseQueryGetStudies } from '@/queries/studyQueries';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import CustomHeader from '@/components/custom-header';
import { Card, CardContent } from "@/components/ui/card";
import {
    Pagination, PaginationContent, PaginationItem, PaginationLink,
    PaginationPrevious, PaginationNext
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { getUserRoleFromToken } from '@/utils/getUserFromToken';

const HistoricList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [userRole, setUserRole] = useState<number | null>(null);
    const navigate = useNavigate();
    const pageSize = 5;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        const role = getUserRoleFromToken();
        setUserRole(role);
    }, []);

    const { data: studiesData } = UseQueryGetStudies(currentPage, pageSize, debouncedSearch);
    const studies = studiesData?.data || [];
    const totalItems = studiesData?.meta?.itemCount || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
                    <Table className="table-fixed w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">ID</TableHead>
                                <TableHead className="w-64 truncate">Estudio</TableHead>
                                <TableHead className="w-64 truncate">Cliente</TableHead>
                                <TableHead className="w-40 whitespace-nowrap">Fecha Término</TableHead>
                                <TableHead className="w-40 whitespace-nowrap">Fecha Completado</TableHead>
                                <TableHead className="w-32 text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studies
                                .filter(study => study.progress_stage?.id === 4)
                                .map(study => (
                                    <TableRow key={study.id}>
                                        <TableCell>{study.id}</TableCell>
                                        <TableCell className="truncate">{study.name}</TableCell>
                                        <TableCell className="truncate">{study.client}</TableCell>
                                        <TableCell>{study.end_date ? new Date(study.end_date).toLocaleDateString() : "N/A"}</TableCell>
                                        <TableCell>{study.completed_at ? new Date(study.completed_at).toLocaleDateString() : "N/A"}</TableCell>
                                        <TableCell className="text-center">
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

                    <div className="mt-6">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        aria-disabled={currentPage === 1}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            goToPage(currentPage - 1);
                                        }}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === page}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                goToPage(page);
                                            }}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        aria-disabled={currentPage === totalPages}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            goToPage(currentPage + 1);
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HistoricList;
