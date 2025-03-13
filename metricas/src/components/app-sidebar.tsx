import { Home, BarChart2, Upload, Users, Folder, Settings, User2, ChevronUp, ChartNoAxesCombined, AudioWaveform } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const menuItems = [
    {
        title: "Inicio",
        url: "/",
        icon: Home,
    },
    {
        title: "Métricas",
        icon: ChartNoAxesCombined,
        subMenu: [
            { title: "Ver estadísticas", url: "/estadisticas", icon: BarChart2 },
            { title: "Cargar reporte", url: "/cargar-reporte", icon: Upload },
        ],
    },
    {
        title: "Calidad",
        icon: AudioWaveform,
        subMenu: [
            { title: "Estudios", url: "/estudios", icon: Folder },
            { title: "Clientes", url: "/clientes", icon: Users },
        ],
    },
    {
        title: "Administrador",
        icon: Settings,
        subMenu: [
            { title: "Usuarios", url: "/users", icon: Settings },
            { title: "Roles", url: "/roles", icon: Settings },
        ],
    }
];

export function AppSidebar() {
    const navigate = useNavigate();

    return (
        <Sidebar className="bg-gray-800 text-black w-64 h-full flex flex-col">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-semibold text-black mb-4">Vértice</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <Collapsible defaultOpen className="group/collapsible" key={item.title}>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton className="w-full flex items-center p-3 text-sm text-black hover:text-gray bg-gray-100 hover:bg-gray-200">
                                                <item.icon className="w-5 h-5 mr-3" />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            {item.subMenu && (
                                                <SidebarMenuSub>
                                                    {item.subMenu.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <SidebarMenuButton asChild className="w-full flex items-center p-3 text-sm text-black hover:text-gray">
                                                                        <Link to={subItem.url} className="flex items-center w-full">
                                                                            <subItem.icon className="w-5 h-5 mr-3" />
                                                                            <span>{subItem.title}</span>
                                                                        </Link>
                                                                    </SidebarMenuButton>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                                                    <DropdownMenuItem>
                                                                        <span>Opción adicional 1</span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <span>Opción adicional 2</span>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            )}
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer con Dropdown Menu */}
            <div className="mt-auto p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full flex items-center justify-between p-3 text-sm text-black hover:text-gray">
                                    <User2 className="w-5 h-5 mr-3" />
                                    Username
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <span>Cuenta</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Facturación</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
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
