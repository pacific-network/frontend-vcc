import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface ConfirmDialogProps {
    title: string;
    description: string;
    onConfirm: () => void;
    triggerLabel: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "destructive" | "link" | "default" | "outline" | "secondary" | "ghost";
}

export function ConfirmDialog({
    title,
    description,
    onConfirm,
    triggerLabel,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    variant = "destructive"
}: ConfirmDialogProps) {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={variant} onClick={() => setOpen(true)}>
                    {triggerLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-4 mt-4">
                    <Button onClick={handleConfirm} variant={variant}>{confirmLabel}</Button>
                    <Button onClick={() => setOpen(false)} variant="secondary">{cancelLabel}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmDialog;
