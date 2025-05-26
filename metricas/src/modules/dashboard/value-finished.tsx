import { useState } from "react";
import DashboardCard from "../../components/dashboard-card";
import { useQueryGetTotalPrices } from "@/queries/studyQueries";
import { Wallet } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";

const ValueFinished = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    const { data } = useQueryGetTotalPrices(currentPage, pageSize);
    const totalPages = data?.meta?.pageCount || 1;

    const goToPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <DashboardCard title="Valor Total Estudio" icon={<Wallet className="w-6 h-6 text-blue-600" />}>
            <div>
                <ul>
                    {data?.data?.map((study) => (
                        <li key={study.id}>
                            <strong>{study.name}:</strong> ${study.totalPrice}
                        </li>
                    ))}
                </ul>
            </div>

            <Pagination>
                <PaginationContent>
                    {/* Anterior */}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) goToPage(currentPage - 1);
                            }}
                            className={clsx({ "pointer-events-none opacity-50": currentPage === 1 })}
                        />
                    </PaginationItem>

                    {/* Páginas */}
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

                    {/* Siguiente */}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) goToPage(currentPage + 1);
                            }}
                            className={clsx({ "pointer-events-none opacity-50": currentPage === totalPages })}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </DashboardCard>
    );
};

export default ValueFinished;
