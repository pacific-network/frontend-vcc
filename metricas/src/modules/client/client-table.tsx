import { useState } from "react";
import CustomHeader from "@/components/custom-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UseQueryGetClients } from "@/queries/clientQueries";
import CreateClientForm from "./create-client";

const ClientTable: React.FC = () => {
    const [page] = useState(1);
    const { data: clientData, isLoading, isError } = UseQueryGetClients(page, 8);

    if (isLoading) return <p>Cargando clientes...</p>;
    if (isError) return <p>Error al cargar clientes.</p>;

    return (
        <div className="size-full p-10">
            <CustomHeader title="Listado Clientes" actions={<CreateClientForm />} />
            <Card className="p-4 shadow-md">
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Mail</TableHead>
                                <TableHead>Teléfono</TableHead>
                                <TableHead>Categoría</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clientData?.data?.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell>{client.id}</TableCell>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.contactEmail}</TableCell>
                                    <TableCell>{client.contactPhone}</TableCell>
                                    <TableCell>{client.category_name ?? "Sin categoría"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ClientTable;
