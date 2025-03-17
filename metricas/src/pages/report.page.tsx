import React from 'react';



import Layout from '@/pages/layout.page';
import FileUpload from '../modules/reports/upload-file';

const Report: React.FC = () => {
    return (
        <Layout>
            <FileUpload onFileUpload={function (file: File): void {
                throw new Error('Function not implemented.');
            } } />
        </Layout>
    );
}
export default Report;