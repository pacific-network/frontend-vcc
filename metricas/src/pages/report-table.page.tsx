import React from 'react';



import Layout from '@/pages/layout.page';
import ListStudies from '@/modules/reports/list-file';


const ListReport: React.FC = () => {
    return (
        <Layout>
            <ListStudies />
        </Layout>
    );
}
export default ListReport;