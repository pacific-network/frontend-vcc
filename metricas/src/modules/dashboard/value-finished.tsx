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
    const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
    const pageSize = 3;

    // Llamamos a la API con la página actual, tamaño de página y búsqueda
    const { data } = useQueryGetTotalPrices(currentPage, pageSize, searchQuery);
    const totalPages = data?.meta?.pageCount || 1;

    console.log("Price:", data);

    // Función para cambiar de página
    const goToPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <DashboardCard title="Valor Total Estudio" icon={<Wallet className="w-6 h-6 text-blue-600" />}>
            {/* Input de búsqueda */}
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Buscar estudio..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reiniciar paginación en búsqueda nueva
                    }}
                />
            </div>

            {/* Lista de estudios */}
            <div>
                {data?.data?.length === 0 ? (
                    <p>No se encontraron estudios.</p>
                ) : (
                    <ul>
                        {data?.data?.map((study) => (
                            <li key={study.id}>
                                <strong>{study.name}:</strong> ${study.totalPrice}
                            </li>
                        ))}
                    </ul>
                )}
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
