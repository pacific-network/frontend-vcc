import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";


const users = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Admin" },
    { id: 2, name: "María López", email: "maria@example.com", role: "User" },
    { id: 3, name: "Carlos Gómez", email: "carlos@example.com", role: "Editor" },
    { id: 4, name: "Ana Rodríguez", email: "ana@example.com", role: "User" },
    { id: 5, name: "Luis Fernández", email: "luis@example.com", role: "Admin" },
];

const ITEMS_PER_PAGE = 3;

const TableUser: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    const paginatedUsers = users.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (

        <div className="w-150 ">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex items-center">
                                            Acciones <ChevronDown className="ml-2 w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Editar</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
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
        </div>

    );
};

export default TableUser;