import { FC } from "react";

import CustomHeader from "@/components/custom-header";
import ActiveStudies from "@/modules/dashboard/active-study";



const HomeAdmin: FC = () => {
    return (
        <div className="size-full p-10">
            <CustomHeader title="Dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ActiveStudies />
            </div>

        </div>
    );
};

export default HomeAdmin;
