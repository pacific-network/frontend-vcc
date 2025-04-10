import DashboardCard from "@/components/dashboard-card";
import { UseQueryGetBillingCurrentMonth } from "@/queries/billingQueries";
import { ChartNoAxesCombined } from "lucide-react";

// Helper para convertir el número de mes a nombre
const getMonthName = (month: number): string => {
    return new Date(2025, month - 1).toLocaleString('es-CL', { month: 'long' });
};

const BillingCurrentMonth = () => {
    const { data, isLoading, error } = UseQueryGetBillingCurrentMonth();

    return (
        <DashboardCard title="Facturación del Mes Actual" icon={<ChartNoAxesCombined className="w-6 h-6 text-blue-600" />}>
            <div className="flex flex-col items-center py-5 space-y-4">
                {/* Caso cuando se está cargando */}
                {isLoading ? (
                    <p className="text-gray-500">Cargando...</p>
                ) : error ? (
                    // Caso cuando hay un error
                    <p className="text-red-500">Error al cargar la facturación</p>
                ) : (
                    // Caso cuando se reciben los datos correctamente
                    <>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Facturación de {getMonthName(data.month)} {data.month}
                        </h2>
                        <div className="text-xl font-bold text-green-500">
                            ${data.total.toLocaleString('es-CL')}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total facturado en el mes
                        </div>
                    </>
                )}
            </div>
        </DashboardCard>
    );
};

export default BillingCurrentMonth;
