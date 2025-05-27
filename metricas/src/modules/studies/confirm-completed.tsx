import { FC, useState } from "react";
import ConfirmDialog from "@/components/confirm-dialog";

interface ConfirmCompletedProps {
    onClose: () => void;  // Asegúrate de que onClose sea parte de las props
}

const ConfirmCompleted: FC<ConfirmCompletedProps> = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleConfirm = () => {
        setIsOpen(false);
        onClose();  // Llama a onClose cuando se confirma
    };

    const handleCancel = () => {
        setIsOpen(false);
        onClose();  // Llama a onClose cuando se cancela
    };

    return (
        <ConfirmDialog
            title="Confirmar Estudio Completado"
            description="¿Estás seguro de que deseas confirmar este estudio como completado? Esta acción no se puede deshacer."
            onConfirm={handleConfirm}
            onCancel={handleCancel}  // Asegúrate de que esta propiedad esté definida en ConfirmDialog
            confirmLabel="Confirmar"
            cancelLabel="Cancelar"
            variant="default"
            isOpen={isOpen}
            setIsOpen={setIsOpen}  // Este setIsOpen se usa para controlar el estado interno del dialogo
        />
    );
};

export default ConfirmCompleted;
