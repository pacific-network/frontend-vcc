import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children }) => {
    return (
        <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon} {title}
                </CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default DashboardCard;