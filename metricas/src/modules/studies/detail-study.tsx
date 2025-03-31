// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useQueryGetProgressStages, useQueryGetStudiesById, useMutationUpdateStudyById } from '@/queries/studyQueries';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import UploadFile from "./upload-report";

// const DetailStudy: React.FC = () => {
//     const location = useLocation();
//     const studyId = location.state?.studyId || null;
//     const { data } = useQueryGetStudiesById(studyId);
//     const mutation = useMutationUpdateStudyById();
//     const { data: dataProgress } = useQueryGetProgressStages();

//     const statusTranslations = {
//         "canceled": "Cancelado",
//         "completed": "Completado",
//         "in_process": "En proceso",
//         "in_review": "En revisión",
//         "pending": "Pendiente"
//     };

//     const translatedDataProgress = dataProgress?.map(stage => ({
//         id: stage.id,
//         name: statusTranslations[stage.name] || stage.name
//     })) || [];

//     const [formData, setFormData] = useState({
//         observaciones: [],
//         progress_stage_id: "",
//         newObservation: ""
//     });

//     useEffect(() => {
//         if (data) {
//             setFormData({
//                 observaciones: data.observaciones || [],
//                 progress_stage_id: data.progress_stage?.id || "",
//                 newObservation: ""
//             });
//         }
//     }, [data]);

//     const handleUpdateStudy = async () => {
//         try {
//             await mutation.mutateAsync({
//                 id: studyId,
//                 progress_stage_id: formData.progress_stage_id,
//                 observaciones: formData.observaciones
//             });
//             toast('Actualización exitosa');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Información del Estudio</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <div className="mb-4">
//                                     <label className="block font-medium">ID</label>
//                                     <input
//                                         type="text"
//                                         value={data?.id || ''}
//                                         disabled
//                                         className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block font-medium">Nombre</label>
//                                     <input
//                                         type="text"
//                                         value={data?.name || ''}
//                                         disabled
//                                         className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block font-medium">Cliente</label>
//                                     <input
//                                         type="text"
//                                         value={data?.client || ''}
//                                         disabled
//                                         className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block font-medium">Fecha de Inicio</label>
//                                     <input
//                                         type="text"
//                                         value={data?.start_date ? new Date(data.start_date).toLocaleDateString() : ''}
//                                         disabled
//                                         className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
//                                     />
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="mb-4">
//                                     <label className="block font-medium">Fecha de Término</label>
//                                     <input
//                                         type="text"
//                                         value={data?.end_date ? new Date(data.end_date).toLocaleDateString() : ''}
//                                         disabled
//                                         className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block font-medium">Cantidad</label>
//                                     <input
//                                         type="text"
//                                         value={data?.quantity || ''}
//                                         disabled
//                                         className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-6">
//                             <label className="block font-medium">Estado de Progreso</label>
//                             <select
//                                 value={formData.progress_stage_id}
//                                 onChange={(e) => setFormData({ ...formData, progress_stage_id: e.target.value })}
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                             >
//                                 <option value="" disabled>Seleccionar estado...</option>
//                                 {translatedDataProgress.map((stage) => (
//                                     <option key={stage.id} value={stage.id}>{stage.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <Button className="mt-6" type="button" onClick={handleUpdateStudy}>
//                             Actualizar Información
//                         </Button>
//                     </form>
//                 </CardContent>
//             </Card>
//             <UploadFile studyId={studyId} files={data?.files || []} />
//         </div>
//     );
// };

// export default DetailStudy;