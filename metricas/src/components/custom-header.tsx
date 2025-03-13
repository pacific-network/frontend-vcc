import { FC, ReactNode } from "react";

interface CustomHeaderProps {
    title: string;
    actions?: ReactNode; // Para botones, dropdowns, etc.
}

const CustomHeader: FC<CustomHeaderProps> = ({ title, actions }) => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md rounded-lg mb-6">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <div>{actions}</div>
        </header>
    );
};

export default CustomHeader;
