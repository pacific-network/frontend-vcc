import React from 'react';



import Layout from '@/pages/layout.page';
import CreateStudyForm from '@/modules/studies/create-study';



const StudyPage: React.FC = () => {
    return (
        <Layout>
            <CreateStudyForm />
        </Layout>
    );
}
export default StudyPage;