import React from 'react';



import Layout from '@/pages/layout.page';
import ListFiles from '@/modules/reports/list-file';


const ListReport: React.FC = () => {
    return (
        <Layout>
            <ListFiles />
        </Layout>
    );
}
export default ListReport;