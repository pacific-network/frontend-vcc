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

const ValueFinished = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    // Llamamos a la API con la página actual y el tamaño de página
    const { data } = useQueryGetTotalPrices(currentPage, pageSize);
    const totalPages = data?.meta?.pageCount || 1;

    console.log("Price:", data);

    // Función para cambiar de página
    const goToPage = (page) => {
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

            {/* Paginación */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </DashboardCard>
    );
};

export default ValueFinished;
