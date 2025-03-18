import React from 'react';



import Layout from '@/pages/layout.page';
import FileUpload from '../modules/reports/upload-file';

const Report: React.FC = () => {
    return (
        <Layout>
            <FileUpload />
        </Layout>
    );
}
export default Report;