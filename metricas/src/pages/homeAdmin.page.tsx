import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, FolderOpen, Upload } from "lucide-react";
import Layout from "./layout.page";


const HomeAdmin: FC = () => {
    return (
        <Layout>
            <div className="container mx-auto py-10 p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Panel de Administración</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Ver Estadísticas */}
                    <Card className="shadow-md hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart className="w-6 h-6 text-blue-600" />
                                Ver Estadísticas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">Consulta estadísticas detalladas sobre el envío de SMS.</p>
                            <Button className="w-full">Ir a Estadísticas</Button>
                        </CardContent>
                    </Card>

                    {/* Ver Campañas */}
                    <Card className="shadow-md hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FolderOpen className="w-6 h-6 text-green-600" />
                                Ver Campañas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">Revisa y gestiona todas las campañas activas.</p>
                            <Button className="w-full">Ir a Campañas</Button>
                        </CardContent>
                    </Card>

                    {/* Cargar Archivo */}
                    <Card className="shadow-md hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Upload className="w-6 h-6 text-red-600" />
                                Cargar Archivo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">Sube archivos CSV para envío masivo de SMS.</p>
                            <Button className="w-full">Cargar Archivo</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default HomeAdmin;
