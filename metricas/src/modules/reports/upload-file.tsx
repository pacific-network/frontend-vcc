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
    DialogTrigger,
} from "@/components/ui/dialog";

const FileUploadDialog = () => {
    const [file, setFile] = useState<File | null>(null);
    const [study, setStudy] = useState("");
    const [client, setClient] = useState("");
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

        const payload = { file, study, client };
        console.log("Payload:", payload);

        try {
            await mutation.mutateAsync(payload);
            toast.success("El archivo fue subido exitosamente.");
        } catch {
            toast.error("Hubo un error al subir el archivo.");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Subir Archivo</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold">
                        Subir Archivo Excel
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 p-4">
                    <Input
                        type="text"
                        placeholder="Estudio"
                        value={study}
                        onChange={(e) => setStudy(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Cliente"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                    />
                    <Input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                    <Button onClick={handleUpload} className="w-full flex items-center gap-2">
                        <UploadCloud className="w-5 h-5" /> Subir Archivo
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FileUploadDialog;