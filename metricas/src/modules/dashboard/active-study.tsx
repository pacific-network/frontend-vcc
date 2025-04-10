import { List } from "lucide-react";
import DashboardCard from "../../components/dashboard-card";
import { UseQueryGetStudies } from "@/queries/studyQueries";

const ActiveStudies = () => {
    // Llamamos a la query para obtener todos los estudios
    const { data, isLoading, error } = UseQueryGetStudies(1, 10, "");

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
                <ul className="list-disc list-inside text-gray-600">
                    {filteredStudies.map((study) => (
                        <li key={study.id}>
                            <span className="font-bold">{study.name}</span> - {study.client}
                        </li>
                    ))}
                </ul>
            )}
        </DashboardCard>
    );
};

export default ActiveStudies;
