
import { useMutationDeleteUserById } from "@/queries/userQueries";
import ConfirmDialog from "@/components/confirm-dialog";

interface DeleteUserProps {
    userId: number;
    onUserDeleted: () => void;
}

export function DeleteUser({ userId, onUserDeleted }: DeleteUserProps) {
    const mutation = useMutationDeleteUserById({
        onSuccess: () => {
            onUserDeleted(); // Refresca la tabla después de eliminar
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
            triggerLabel="Eliminar Usuario"
            confirmLabel="Eliminar"
            cancelLabel="Cancelar"
            variant="destructive"
        />
    );
}

export default DeleteUser;
