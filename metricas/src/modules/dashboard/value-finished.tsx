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
import { Input } from "@/components/ui/input";

const ValueFinished = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const pageSize = 3;

    const { data } = useQueryGetTotalPrices(currentPage, pageSize, searchQuery);
    const totalPages = data?.meta?.pageCount || 1;

    const goToPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <DashboardCard
            title="Valor Estudio (Ultimo Reporte)"
            icon={<Wallet className="w-6 h-6 text-blue-600" />}
        >
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Buscar estudio..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div>
                {data?.data?.length === 0 ? (
                    <p>No se encontraron estudios.</p>
                ) : (
                    <ul className="space-y-2">
                        {data?.data?.map((study) => (
                            <li key={study.id}>
                                <strong>{study.name}:</strong> ${study.totalPrice}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            aria-disabled={currentPage === 1}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) goToPage(currentPage - 1);
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
                                if (currentPage < totalPages) goToPage(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </DashboardCard>
    );
};

export default ValueFinished;
