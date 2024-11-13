import { IconsLogo } from "@/assets";
import SidebarMenu from "./SidebarMenu";
import { faHome, faDatabase, faCashRegister, faFile, faGear } from "@fortawesome/free-solid-svg-icons";

const sidebarItems = [
    { icon: faHome, url: "/pages" },
    { icon: faDatabase, url: "/pages/master-data" },
    { icon: faCashRegister, url: "/pages/transactions" },
    { icon: faFile, url: "/pages/" },
    { icon: faGear, url: "/pages/" }
];

const Sidebar = () => {
    return (
        <div className="w-[80px] h-screen py-3 flex flex-col items-center shadow-xl bg-white">
            <img src={IconsLogo} className="h-12 w-12" alt="" />
            <div className="flex flex-col mt-8 items-center w-full h-max gap-1">
                {sidebarItems.map((item, index) => (
                    <SidebarMenu
                        key={index}
                        icons={item.icon}
                        url={item.url}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
