import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { List, BarChart, DollarSign, FileText } from "lucide-react";
import CustomHeader from "@/components/custom-header";


const HomeAdmin: FC = () => {
    return (
        <div className="size-full p-10">
            <CustomHeader title="Dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                <Card className="shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <List className="w-6 h-6 text-blue-600" />
                            Estudios Activos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside text-gray-600">
                            <li>Estudio 1 - Cliente A</li>
                            <li>Estudio 2 - Cliente B</li>
                            <li>Estudio 3 - Cliente C</li>
                            <li>Estudio 4 - Cliente D</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Métricas */}
                <Card className="shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart className="w-6 h-6 text-green-600" />
                            Métricas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Métrica</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead>Cambio</TableHead>
                                    <TableHead>Meta</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Mensajes Enviados</TableCell>
                                    <TableCell>10,000</TableCell>
                                    <TableCell>+5%</TableCell>
                                    <TableCell>15,000</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tasa de Entrega</TableCell>
                                    <TableCell>98%</TableCell>
                                    <TableCell>+2%</TableCell>
                                    <TableCell>99%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Conversiones</TableCell>
                                    <TableCell>750</TableCell>
                                    <TableCell>+10%</TableCell>
                                    <TableCell>1,000</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Rechazos</TableCell>
                                    <TableCell>200</TableCell>
                                    <TableCell>-5%</TableCell>
                                    <TableCell>100</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Facturación */}
                <Card className="shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="w-6 h-6 text-yellow-600" />
                            Facturación
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">Total Facturado: <span className="font-bold">$25,000</span></p>
                        <p className="text-gray-600">Facturas Pendientes: <span className="font-bold">$5,000</span></p>
                        <p className="text-gray-600">Último Pago: <span className="font-bold">10 de Marzo, 2025</span></p>
                    </CardContent>
                </Card>

                {/* Sección Genérica */}
                <Card className="shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-6 h-6 text-gray-600" />
                            Información General
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">Aquí puedes agregar información adicional relevante.</p>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default HomeAdmin;
