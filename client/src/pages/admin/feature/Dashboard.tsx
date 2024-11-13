import { IconsObat } from "@/assets";
import CardDashboard from "@/components/ui/Card/CardDashboard";

const Dashboard = () => {
    const cardData = [
        { icon: IconsObat, title: "Jumlah Obat", count: 100 },
        { icon: IconsObat, title: "Jumlah Stock", count: 100 },
        { icon: IconsObat, title: "Pendapatan Total", count: 100 },
        { icon: IconsObat, title: "Laba Total", count: 100 }
    ];

    return (
        <div className="my-10 mx-5 h-max">
            <div className="w-full h-max grid xl:grid-cols-5 grid-cols-3 md:grid-cols-3 gap-4">
                {cardData.map((data, index) => (
                    <CardDashboard 
                        key={index} 
                        icon={data.icon} 
                        title={data.title} 
                        count={data.count} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
