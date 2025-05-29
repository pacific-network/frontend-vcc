import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";

const ValueFinished = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const pageSize = 3;

    // Debounce del término de búsqueda para evitar llamadas excesivas
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1); // Reinicia la paginación al buscar
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const { data } = useQueryGetTotalPrices(currentPage, pageSize, debouncedSearch);
    const totalPages = data?.meta?.pageCount || 1;

    const goToPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <DashboardCard title="Monto Actual Estudio" icon={<Wallet className="w-6 h-6 text-blue-600" />}>
            <div className="mb-4 flex justify-start">
                <Input
                    type="text"
                    placeholder="Buscar por nombre del estudio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 border p-2"
                />
            </div>

            <div>
                {data?.data && data.data.length > 0 ? (
                    <ul>
                        {data.data.map((study) => (
                            <li key={study.id}>
                                <strong>{study.name}:</strong> ${study.totalPrice}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No se encontraron estudios.</p>
                )}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                goToPage(currentPage - 1);
                            }}
                            className={clsx({ "pointer-events-none opacity-50": currentPage === 1 })}
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
                            onClick={(e) => {
                                e.preventDefault();
                                goToPage(currentPage + 1);
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
