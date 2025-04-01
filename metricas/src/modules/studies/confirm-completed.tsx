import { FC, useState } from "react";
import ConfirmDialog from "@/components/confirm-dialog";

const ConfirmCompleted: FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleConfirm = () => {
        setIsOpen(false);
    };



    return (
        <ConfirmDialog
            title="Confirmar Estudio Completado"
            description="¿Estás seguro de que deseas confirmar este estudio como completado? Esta acción no se puede deshacer."
            onConfirm={handleConfirm}

            triggerLabel="Confirmar Completado"
            confirmLabel="Confirmar"
            cancelLabel="Cancelar"
            variant="default"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
    );
};

export default ConfirmCompleted;