import React, { useState } from 'react';
import { UseQueryGetStudies } from '@/queries/studyQueries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CustomHeader from '@/components/custom-header';
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from '@/components/ui/pagination'; // Asegúrate de tener un componente de paginación

const HistoricList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const { data: studiesData } = UseQueryGetStudies(currentPage, pageSize);

    console.log("Studies Data:", studiesData);
    const studies = studiesData?.data || [];
    const totalItems = studiesData?.total || 0;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="size-full p-10">
            <CustomHeader title={'Estudios Completados'} />

            <Card className="mt-4 shadow-lg">
                <CardContent className="p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Estudio</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Fecha Termino</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Fecha Completado</TableHead>
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
                                        <TableCell>{study.progress_stage?.name || "Unknown"}</TableCell>
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
        </div>
    );
};

export default HistoricList;
