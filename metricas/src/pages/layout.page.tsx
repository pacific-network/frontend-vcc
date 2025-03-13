import { FC, ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Provider } from "@radix-ui/react-tooltip";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <Provider>
                <SidebarTrigger />
                {children}
            </Provider>
        </SidebarProvider>
    );
};

export default Layout;
