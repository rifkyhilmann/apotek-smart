import { IconsCategory, IconsObat } from "@/assets";
import DataCategory from "@/components/feature/MasterData/DataCategory";
import DataObat from "@/components/feature/MasterData/DataObat";
import DataSatuan from "@/components/feature/MasterData/DataSatuan";
import ButtonNavigation from "@/components/ui/Button/ButtonNavigation";
import { Route, Routes } from "react-router-dom";

const MasterData = () => {
    const menuItems = [
        { icon: IconsObat, title: "Obat", url: "/pages/master-data" },
        { icon: IconsCategory, title: "Category", url: "/pages/master-data/category" },
        { icon: IconsCategory, title: "Satuan", url: "/pages/master-data/satuan" }
    ];

    return (
        <div className="my-5 flex flex-col flex-grow">
            <div className="h-14 w-full flex items-center gap-3">
                {menuItems.map((item, index) => (
                    <ButtonNavigation
                        key={index}
                        type="menu"
                        imgSrc={item.icon}
                        title={item.title}
                        url={item.url}
                    />
                ))}
            </div>
            <Routes>
                <Route path="/" element={<DataObat />} />
                <Route path="/category" element={<DataCategory />} />
                <Route path="/satuan" element={<DataSatuan />} />
            </Routes>
        </div>
    );
}

export default MasterData;
