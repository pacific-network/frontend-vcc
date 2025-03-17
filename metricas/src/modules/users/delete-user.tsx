import { useMutationDeleteUserById } from "@/queries/userQueries";
import ConfirmDialog from "@/components/confirm-dialog";

interface DeleteUserProps {
    userId: number;
    onUserDeleted: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export function DeleteUser({ userId, onUserDeleted, isOpen, setIsOpen }: DeleteUserProps) {
    const mutation = useMutationDeleteUserById({
        onSuccess: () => {
            onUserDeleted();
        },
        onError: (error: any) => {
            console.error("Error eliminando usuario:", error);
        },
    });

    const handleConfirmDelete = () => {
        mutation.mutate(userId);
    };

    return (
        <ConfirmDialog
            title="Eliminar Usuario"
            description="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
            onConfirm={handleConfirmDelete}
            triggerLabel="Eliminar" // No cambiará el texto "Eliminar"
            confirmLabel="Eliminar"
            cancelLabel="Cancelar"
            variant="destructive"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
    );
}

export default DeleteUser;
