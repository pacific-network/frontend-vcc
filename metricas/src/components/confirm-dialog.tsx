import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ConfirmDialogProps {
    title: string;
    description: string;
    onConfirm: () => void;
    triggerLabel: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "destructive" | "link" | "default" | "outline" | "secondary" | "ghost";
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export function ConfirmDialog({
    title,
    description,
    onConfirm,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    variant = "destructive",
    isOpen,
    setIsOpen
}: ConfirmDialogProps) {
    const handleConfirm = () => {
        onConfirm();
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-4 mt-4">
                    <Button onClick={handleConfirm} variant={variant}>{confirmLabel}</Button>
                    <Button onClick={() => setIsOpen(false)} variant="secondary">{cancelLabel}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmDialog;
