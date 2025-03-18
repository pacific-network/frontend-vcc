import CustomHeader from '@/components/custom-header';

import React from 'react';

const ListFiles: React.FC = () => {
    const columns = [
        'Id',
        'Codigo',
        'Fecha Creacion',
        'Cliente',
        'Estudio',
        'Detalle'
    ];

    return (

        <div className="size-full m-8 shadow-md rounded-lg bg-white">
            <CustomHeader title={'Reportes '} />

            <table className="min-w-full table-auto">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="px-4 py-2 text-left font-semibold">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí puedes agregar las filas de datos si tienes alguna fuente de datos */}
                    {/* Ejemplo con una fila vacía por ahora */}
                    <tr>
                        {columns.map((_, index) => (
                            <td key={index} className="px-4 py-2 text-gray-500">
                                {/* Este es un lugar para mostrar datos */}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ListFiles;
