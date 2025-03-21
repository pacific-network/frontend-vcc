import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { UseQueryGetUsers } from "@/queries/userQueries";
import CustomHeader from "@/components/custom-header";
import { Card, CardContent } from "@/components/ui/card";
import UserForm from "./create-user";
import DeleteUser from "./delete-user";
import UpdateUser from "./update-user";

const TableUser: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const pageSize = 5;

    const { data, refetch } = UseQueryGetUsers(currentPage, pageSize);
    const users = data?.data || [];
    const totalPages = data?.meta?.pageCount || 1;

    const handleDeleteClick = (userId: number) => {
        setSelectedUserId(userId);
        setIsDeleteOpen(true);
    };

    const handleUpdateClick = (userId: number) => {
        setSelectedUserId(userId);
        setIsUpdateOpen(true);
    };

    const handleUserDeleted = () => {
        refetch();
        setSelectedUserId(null);
        setIsDeleteOpen(false);
    };

    const handleUserUpdated = () => {
        refetch();
        setSelectedUserId(null);
        setIsUpdateOpen(false);
    };

    return (
        <div className="size-full p-10">
            <CustomHeader title="Gestión de Usuarios" actions={<UserForm />} />
            <Card>
                <CardContent>
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
                                <TableRow key={Number(user.id)}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name} {user.lastname ?? ""}</TableCell>
                                    <TableCell>{user.mail}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="flex items-center">
                                                    Acciones <ChevronDown className="ml-2 w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleUpdateClick(Number(user.id))}>
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-500"
                                                    onClick={() => handleDeleteClick(Number(user.id))}
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
                </CardContent>
            </Card>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Anterior
                </Button>
                <span>Página {currentPage} de {totalPages}</span>
                <Button
                    variant="outline"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Siguiente
                </Button>
            </div>

            {/* Dialog para eliminar usuario */}
            {selectedUserId !== null && isDeleteOpen && (
                <DeleteUser
                    userId={selectedUserId}
                    onUserDeleted={handleUserDeleted}
                    isOpen={isDeleteOpen}
                    setIsOpen={setIsDeleteOpen}
                />
            )}

            {/* Dialog para actualizar usuario */}
            {selectedUserId !== null && isUpdateOpen && (
                <UpdateUser
                    userId={selectedUserId}
                    onUserUpdated={handleUserUpdated}
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                />
            )}
        </div>
    );
};

export default TableUser;
