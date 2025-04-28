import { getUserRoleFromToken } from "../utils/getUserFromToken";
import {
    Home, BarChart2, BookPlus, Settings, User2, ChevronUp,
    ChartBar, UserRoundCog, Handshake, LayoutDashboard, UsersRound, ListChecks,
    UserRoundPlus
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
    SidebarGroupLabel, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";

// 👇 Diccionario de íconos
const Icons: Record<string, any> = {
    Home, BarChart2, BookPlus, Settings, User2, ChevronUp,
    ChartNoAxesCombined: ChartBar, UserRoundCog, Handshake, LayoutDashboard, UsersRound, ListChecks, UserRoundPlus
};

// 👇 Menú con roles permitidos
const menuItems = [
    {
        title: "Inicio",
        icon: "Home",
        roles: [1, 2, 3],
        subMenu: [
            { title: "Dashboard", url: "/homeAdmin", icon: "LayoutDashboard", roles: [1, 2] },
            { title: "Dashboard ", url: "/home", icon: "LayoutDashboard", roles: [3] },
        ],
    },
    {
        title: "Estudios",
        icon: "ChartNoAxesCombined",
        roles: [1, 2, 3],
        subMenu: [
            { title: "Crear Estudio", url: "/create-study", icon: "BookPlus", roles: [1, 2] },
            { title: "Estudios Activos", url: "/list", icon: "BarChart2", roles: [1, 2, 3] },
            { title: "Histórico Estudios", url: "/completed", icon: "BarChart2", roles: [1, 2, 3] }, // ícono corregido
        ],
    },
    {
        title: "Ejecutivos ",
        icon: "UsersRound",
        roles: [1, 2, 3],
        subMenu: [
            { title: "Nuevo Ejecutivo", url: "/create-study", icon: "UserRoundPlus", roles: [1, 2] },
            { title: "Ver Ejecutivos", url: "/executive", icon: "ListChecks", roles: [1, 2, 3] },

        ],
    },
    {
        title: "Administrador",
        icon: "Settings",
        roles: [1, 2],
        subMenu: [
            { title: "Usuarios", url: "/users", icon: "UserRoundCog", roles: [1, 2] },
            { title: "Clientes", url: "/client-list", icon: "Handshake", roles: [1, 2] },
        ],
    },
];

export function AppSidebar() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState<number | null>(null);

    useEffect(() => {
        const role = getUserRoleFromToken();
        setUserRole(role);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    if (userRole === null) return null;

    return (
        <Sidebar className="w-64 h-full flex flex-col">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xl font-semibold  mb-4">
                        Vértice Contact Center
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems
                                .filter((item) => item.roles.includes(userRole))
                                .map((item) => {
                                    const Icon = Icons[item.icon];
                                    return (
                                        <Collapsible key={item.title} defaultOpen className="group/collapsible">
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton className="w-full flex items-center p-3 text-sm hover:bg-blue-100">
                                                        <Icon className="w-5 h-5 mr-3" />
                                                        <span>{item.title}</span>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    {item.subMenu && (
                                                        <SidebarMenuSub>
                                                            {item.subMenu
                                                                .filter((sub) => sub.roles.includes(userRole))
                                                                .map((subItem) => {
                                                                    const SubIcon = Icons[subItem.icon];
                                                                    return (
                                                                        <SidebarMenuSubItem key={subItem.title}>
                                                                            <SidebarMenuButton asChild className="w-full flex items-center p-3 text-sm text hover:bg-blue-100">
                                                                                <Link to={subItem.url} className="flex items-center w-full">
                                                                                    <SubIcon className="w-5 h-5 mr-3" />
                                                                                    <span>{subItem.title}</span>
                                                                                </Link>
                                                                            </SidebarMenuButton>
                                                                        </SidebarMenuSubItem>
                                                                    );
                                                                })}
                                                        </SidebarMenuSub>
                                                    )}
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <div className="mt-auto p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full flex items-center justify-between p-3 text-sm  hover:bg-blue-100">
                                    <User2 className="w-5 h-5 mr-3" />
                                    Mi Perfil
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-full bg-white text-black">
                                <DropdownMenuItem>
                                    <span>Cuenta</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </div>
        </Sidebar>
    );
}