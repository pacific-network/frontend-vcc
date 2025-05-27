import { FC } from "react";
import { useMutationDeleteUserById } from "@/queries/userQueries";
import ConfirmDialog from "@/components/confirm-dialog";

interface DeleteUserProps {
    userId: number;
    onUserDeleted: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const DeleteUser: FC<DeleteUserProps> = ({ userId, onUserDeleted, isOpen, setIsOpen }) => {
    // Define las funciones onSuccess y onError fuera del hook
    const handleSuccess = () => {
        onUserDeleted();
        setIsOpen(false);  // Cierra el diálogo cuando la eliminación sea exitosa
    };

    const handleError = (error: any) => {
        console.error("Error eliminando usuario:", error);  // Muestra el error en la consola
    };

    // Utiliza mutateAsync sin pasar las funciones directamente al hook
    const mutation = useMutationDeleteUserById();

    const handleConfirmDelete = async () => {
        try {
            await mutation.mutateAsync(userId);  // Llama a mutateAsync con el userId
            handleSuccess();  // Llama a handleSuccess solo si la mutación es exitosa
        } catch (error) {
            handleError(error);  // Llama a handleError si hay un error
        }
    };

    return (
        <ConfirmDialog
            title="Eliminar Usuario"
            description="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
            onConfirm={handleConfirmDelete}  // Llama a handleConfirmDelete cuando se confirme
            confirmLabel="Eliminar"
            cancelLabel="Cancelar"
            variant="destructive"
            isOpen={isOpen}  // Controla si el diálogo está abierto
            setIsOpen={setIsOpen}  // Función para cerrar el diálogo
        />
    );
};

export default DeleteUser;
