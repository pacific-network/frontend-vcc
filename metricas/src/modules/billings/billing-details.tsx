import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useQueryDetailBillingById, useQueryRemainingBilling } from "@/queries/billingQueries";
import Layout from "@/pages/layout.page";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CustomHeader from "@/components/custom-header";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


const DetailBilling: FC = () => {
    const location = useLocation();
    const studyId = location.state?.studyId;

    const { data } = useQueryDetailBillingById(studyId);
    const { data: remaining } = useQueryRemainingBilling(studyId);
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CL').format(value);
    };

    // Transformar los datos para el gráfico
    const chartData = Object.keys(data?.data || {}).map(date => ({
        date,
        montoDiario: data?.data[date].detallePorDia.montoDiario || 0,
        llamadasRealizadasDia: data?.data[date].detallePorDia.llamadasRealizadasDia || 0,
    }));

    return (
        <Layout>
            <div className="size-full p-10">
                <CustomHeader title="Detalle de Facturación" />
                <Card>
                    <CardTitle className="text-center  text-xl mb-4">
                        Detalles del Estudio
                    </CardTitle>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm">
                                <span >Mes</span>
                                <span className="text-xl font-bold text-blue-600">
                                    {data?.month || "No disponible"}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm">
                                <span >Total Llamadas Realizadas</span>
                                <span className="text-xl font-bold text-blue-600">
                                    {data?.quantity || "No disponible"}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm">
                                <span >Monto Total Mes</span>
                                <span className="text-xl font-bold text-blue-600">
                                    {data?.total ? formatCurrency(data.total) : "No disponible"}
                                </span>

                            </div>
                            {/* RESTANTE MES */}
                            <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm">
                                <span>Total Llamadas Restantes</span>
                                <span className="text-xl font-bold text-blue-600">
                                    {remaining?.[0]?.remainingCalls ?? "0"}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm">
                                <span>Cuota Estudio</span>
                                <span className="text-xl font-bold text-blue-600">
                                    {remaining?.[0]?.pricePerCall ?? "Completada"}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm">
                                <span>Monto Total Llamadas Restantes</span>
                                <span className="text-xl font-bold text-blue-600">
                                    {remaining?.[0]?.amount !== undefined
                                        ? formatCurrency(remaining[0].amount)
                                        : "Sin Monto"}
                                </span>
                            </div>



                        </div>
                    </CardContent>
                </Card>

                {/* Gráfico */}
                <Card>
                    <CardTitle className="text-center text-xl mb-4">
                        Gráfico de Llamadas y Monto Diario
                    </CardTitle>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="montoDiario" fill="#8884d8" name="Monto Diario" />
                                <Bar dataKey="llamadasRealizadasDia" fill="#82ca9d" name="Llamadas Realizadas" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default DetailBilling;
