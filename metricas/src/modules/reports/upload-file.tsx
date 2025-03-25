import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import { useMutationUploadFile } from "@/queries/fileQueries";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog";

interface FileUploadDialogProps {
    onClose: () => void;
    studyId: number;
    client: string;
}

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({ onClose, studyId, client }) => {
    const [file, setFile] = useState<File | null>(null);
    const mutation = useMutationUploadFile();


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Selecciona un archivo antes de subirlo.");
            return;
        }

        // Asegúrate de que studyId sea un número y no nulo
        if (!studyId || isNaN(studyId)) {
            toast.error("El ID de estudio es obligatorio y debe ser un número válido.");
            return;
        }

        const payload = { file, studyId, client };
        console.log("Payload:", payload);

        try {
            await mutation.mutateAsync(payload);
            toast.success("El archivo fue subido exitosamente.");
            onClose(); // Cierra el modal después de la carga
        } catch {
            toast.error("Hubo un error al subir el archivo.");
        }
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold">
                        Subir Archivo (.csv)
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 p-4">
                    <Input
                        type="text"
                        value={studyId || ""}
                        disabled
                        placeholder="Estudio"
                    />
                    <Input
                        type="text"
                        value={client || ""}
                        disabled
                        placeholder="Cliente"
                    />
                    <Input type="file" accept=".csv" onChange={handleFileChange} />
                    <Button onClick={handleUpload} className="w-full flex items-center gap-2">
                        <UploadCloud className="w-5 h-5" /> Subir Archivo
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FileUploadDialog;
