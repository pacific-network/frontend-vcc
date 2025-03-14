import React from 'react';
import Layout from './layout.page';

import TableUser from '@/modules/users/table-users';

const Users: React.FC = () => {
    return (
        <Layout>
            <TableUser />
        </Layout>
    );
}
export default Users;