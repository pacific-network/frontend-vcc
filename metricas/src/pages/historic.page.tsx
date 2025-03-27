import React from 'react';
import Layout from '@/pages/layout.page';
import HistoricList from '@/modules/studies/historic-list';



const HistoricPage: React.FC = () => {
    return (
        <Layout>
            <HistoricList />
        </Layout>
    );
}
export default HistoricPage;