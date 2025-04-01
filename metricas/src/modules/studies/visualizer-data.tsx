import React from "react";
import UploadFile from "./upload-report";
import DetailStudy from "./detail-study";
import CustomHeader from "@/components/custom-header";

const VisualizerData: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto pr-5 mt-10 mb-4">
            <CustomHeader title="Detalle Estudio" />
            <DetailStudy />
            <UploadFile />
        </div>
    );
}

export default VisualizerData;