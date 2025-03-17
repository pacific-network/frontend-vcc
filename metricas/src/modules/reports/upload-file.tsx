import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloudUploadIcon } from "@heroicons/react/outline";
import { useMutationUploadFile } from "@/queries/fileQueries";

const FileUpload: FC = () => {

    const [study, setStudyCode] = useState("");
    const [client, setClient] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const mutation = useMutationUploadFile();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files ? e.dataTransfer.files[0] : null;
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Impide que el navegador maneje el evento y permita la carga del archivo
    };

    const handleUpload = () => {
        if (!selectedFile || !study.trim() || !client.trim()) return;

        const formData = new FormData();

        formData.append("study", study);
        formData.append("client", client);
        formData.append("file", selectedFile);

        mutation.mutate(formData, {
            onSuccess: (data) => {
                console.log("Archivo subido exitosamente", data);
                setSelectedFile(null);
                setStudyCode("");
                setClient("");
            },
            onError: (error) => {
                console.error("Error al subir el archivo", error);
            },
        });
    };

    return (
        <div className="size-full p-10">
            {/* Inputs para "study" y "client" */}
            <div className="space-y-6 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                <Input
                    type="text"
                    placeholder="Ingresa nombre / código de estudio"
                    value={study}
                    onChange={(e) => setStudyCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />

                <Input
                    type="text"
                    placeholder="Ingresa cliente"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Sección de carga de archivos */}
            <div
                className="space-y-6 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 shadow-sm"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es una zona de carga
            >
                <div className="text-center">
                    <CloudUploadIcon className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargar un archivo</h3>
                    <p className="text-sm text-gray-500 mb-4">Arrastra y suelta un archivo aquí o selecciona uno (JPG, PNG, PDF, Excel)</p>
                </div>

                {/* Input oculto */}
                <input
                    type="file"
                    id="file-upload-input"
                    onChange={handleFileChange}
                    accept=".csv,.xls,.xlsx"

                />

                {/* Label que activa el input file */}
                <label htmlFor="file-upload-input">
                    <Button variant="outline" className="w-full">
                        Seleccionar archivo
                    </Button>
                </label>

                {selectedFile && (
                    <div className="mt-4 flex justify-between items-center bg-white p-2 rounded-lg shadow-sm">
                        <span className="text-sm font-medium text-gray-700 truncate">{selectedFile.name}</span>
                        <Button
                            variant="outline"
                            onClick={handleUpload}
                            className="ml-4 px-4 py-2 text-sm"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Subiendo..." : "Subir"}
                        </Button>
                    </div>
                )}

                {mutation.isError && (
                    <p className="text-red-500 text-sm mt-2">Error al subir el archivo</p>
                )}

                {mutation.isSuccess && (
                    <p className="text-green-500 text-sm mt-2">Archivo subido exitosamente</p>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
