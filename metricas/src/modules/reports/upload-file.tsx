import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { useMutationUploadFile } from "@/queries/fileQueries";
import { toast } from "sonner"; // Importa el toast de sonner

const FileUpload = () => {
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
            alert("Selecciona un archivo antes de subirlo.");
            return;
        }

        const payload = {
            file: file,
            study: study,
            client: client,
        };

        console.log("Payload:", payload); // ✅ Verifica que el objeto tiene las propiedades correctas

        try {
            await mutation.mutateAsync(payload);
            toast.success("El archivo fue subido exitosamente."); // Muestra el mensaje de éxito
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Hubo un error al subir el archivo."); // Muestra un mensaje de error en caso de fallo
        }
    };

    return (
        <div className="size-full p-10">
            <Card className="max-w-md mx-auto p-6 shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">Subir Archivo Excel</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
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
                </CardContent>
            </Card>
        </div>
    );
};

export default FileUpload;
