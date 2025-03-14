import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { UseQueryGetUsers } from "@/queries/userQueries";
import CustomHeader from "../../components/custom-header";
import { Separator } from "@radix-ui/react-separator";
import UserForm from "./create-user";
import DeleteUser from "./delete-user";

const TableUser: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Estado para el usuario a eliminar
    const pageSize = 5;
    const { data, refetch } = UseQueryGetUsers(currentPage, pageSize);
    const users = data?.data || [];
    const totalPages = data?.meta?.pageCount || 1;

    // Función para abrir el diálogo de eliminación
    const handleDeleteClick = (userId: number) => {
        setSelectedUserId(userId);
    };

    // Función para actualizar la tabla tras eliminación
    const handleUserDeleted = () => {
        refetch();
        setSelectedUserId(null);
    };

    return (
        <div className="size-full p-10">
            <CustomHeader title="Gestión de Usuarios" actions={<UserForm />} />
            <Separator />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre Completo</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name} {user.lastname}</TableCell>
                            <TableCell>{user.mail}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex items-center">
                                            Acciones <ChevronDown className="ml-2 w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Editar</DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-500"
                                            onClick={() => handleDeleteClick(user.id)}
                                        >
                                            Eliminar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Anterior
                </Button>
                <span>Página {currentPage} de {totalPages}</span>
                <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Siguiente
                </Button>
            </div>

            {/* Dialog para eliminar usuario */}
            {selectedUserId !== null && (
                <DeleteUser userId={selectedUserId} onUserDeleted={handleUserDeleted} />
            )}
        </div>
    );
};

export default TableUser;
