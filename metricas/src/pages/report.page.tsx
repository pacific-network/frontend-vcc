import React from 'react';



import Layout from '@/pages/layout.page';
import FileUpload from '../modules/reports/upload-file';

const Report: React.FC = () => {
    return (
        <Layout>
            <FileUpload onClose={function (): void {
                throw new Error('Function not implemented.');
            }} studyId={0} client={''} />
        </Layout>
    );
}
export default Report;