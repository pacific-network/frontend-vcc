import { FC } from "react";
import CustomHeader from "@/components/custom-header";
import ActiveStudies from "@/modules/dashboard/active-study";
import Layout from "./layout.page";

import HistoricSupervisor from "@/modules/studies/card-historic-supervisor";


const HomeSupervisor: FC = () => {
    return (
        <Layout>
            <div className="size-full p-10">
                <CustomHeader title="Dashboard" />
                <div>
                    <ActiveStudies />
                    <HistoricSupervisor />
                </div>
            </div>
        </Layout >
    );
}
export default HomeSupervisor;
