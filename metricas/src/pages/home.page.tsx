import React from 'react';



import Layout from '@/pages/layout.page';
import HomeAdmin from './homeAdmin.page';


const Home: React.FC = () => {
    return (
        <Layout>
            <HomeAdmin />
        </Layout>
    );
}
export default Home;