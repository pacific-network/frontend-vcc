import { useState } from "react";
import { List, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardCard from "../../components/dashboard-card";
import { UseQueryGetStudies } from "@/queries/studyQueries";

const ActiveStudies = () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;

    // Llamamos a la query con paginación
    const { data, isLoading, error } = UseQueryGetStudies(page, pageSize);

    // Filtramos solo los estudios con progress_stage.id === 1
    const filteredStudies = data?.data?.filter(study => study.progress_stage?.id === 1) || [];

    return (
        <DashboardCard title="Estudios Activos" icon={<List className="w-6 h-6 text-blue-600" />}>
            {isLoading ? (
                <p className="text-gray-500">Cargando estudios...</p>
            ) : error ? (
                <p className="text-red-500">Error al cargar los estudios</p>
            ) : filteredStudies.length === 0 ? (
                <p className="text-gray-500">No hay estudios activos</p>
            ) : (
                <>
                    <ul className="list-disc list-inside text-gray-600">
                        {filteredStudies.map((study) => (
                            <li key={study.id}>
                                <span className="font-bold">{study.name}</span> - {study.client}
                            </li>
                        ))}
                    </ul>

                    {/* Paginación */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-3 py-1 flex items-center gap-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Anterior
                        </button>

                        <span className="text-gray-600">Página {page}</span>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={!data?.meta?.hasNextPage}
                            className="px-3 py-1 flex items-center gap-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
                        >
                            Siguiente
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </>
            )}
        </DashboardCard>
    );
};

export default ActiveStudies;
