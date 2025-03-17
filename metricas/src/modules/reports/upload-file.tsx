import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloudUploadIcon } from "@heroicons/react/outline"; // Si usas Heroicons o puedes agregar otro ícono

interface FileUploadProps {
    onFileUpload: (file: File) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
            setSelectedFile(null); // Resetea el estado después de la carga
        }
    };

    return (
        <div className="size-full p-10">
            <div className="space-y-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="text-center">
                    <CloudUploadIcon className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargar un archivo</h3>
                    <p className="text-sm text-gray-500 mb-4">Seleccione un archivo para cargar (JPG, PNG, PDF)</p>
                </div>

                <Input
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="cursor-pointer hidden"
                    id="file-upload-input"
                />

                {/* Botón que abre el file input */}
                <label htmlFor="file-upload-input">
                    <Button variant="outline" className="w-full">
                        Seleccionar archivo
                    </Button>
                </label>

                {selectedFile && (
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 truncate">{selectedFile.name}</span>
                        <Button
                            variant="outline"
                            onClick={handleUpload}
                            className="ml-4 px-4 py-2 text-sm"
                        >
                            Subir
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
