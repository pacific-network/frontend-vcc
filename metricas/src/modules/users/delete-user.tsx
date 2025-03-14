import { useMutationDeleteUserById } from "@/queries/userQueries";
import ConfirmDialog from "@/components/confirm-dialog";

export function DeleteUser({ userId, onUserDeleted }) {
    const mutation = useMutationDeleteUserById({
        onSuccess: () => {
            onUserDeleted();
        },
        onError: (error) => {
            console.error("Error eliminando usuario:", error);
        },
    });

    const handleDelete = () => {
        mutation.mutate(userId);
    };

    return (
        <ConfirmDialog
            title="Eliminar Usuario"
            description="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
            onConfirm={handleDelete}
            triggerLabel="Eliminar Usuario"
            confirmLabel="Eliminar"
            cancelLabel="Cancelar"
            variant="destructive"
        />
    );
}

export default DeleteUser;