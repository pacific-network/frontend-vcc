import React from 'react';



import Layout from '@/pages/layout.page';
import ClientTable from '@/modules/client/client-table';



const ClientPage: React.FC = () => {
    return (
        <Layout>
            <ClientTable />

        </Layout>
    );
}
export default ClientPage;