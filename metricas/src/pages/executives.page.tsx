import React from 'react';
import Layout from '@/pages/layout.page';
import ExecutiveList from '@/modules/executives/executive-list';




const ExecutivePage: React.FC = () => {
    return (
        <Layout>
            < ExecutiveList />
        </Layout>
    );
}
export default ExecutivePage;