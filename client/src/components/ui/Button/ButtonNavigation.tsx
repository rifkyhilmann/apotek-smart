import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

interface Props {
    title: string;
    icon?: IconDefinition;  // Menggunakan `icon` hanya jika diperlukan
    url: string;
    type?: 'menu' | 'link'; // Menambahkan tipe untuk menentukan apakah ini menu atau link
    imgSrc?: string; // Menambahkan parameter untuk gambar
}

const ButtonNavigation = ({ title, icon, url, type = 'link', imgSrc }: Props) => {
    const location = useLocation();

    if (type === 'menu') {
        // Jika tipe adalah 'menu', tampilkan div dengan gambar dan title
        return (
            <Link 
                to={url} 
                className={`
                ${location.pathname === url ? 'text-white bg-blue-gradient' : 'text-primary bg-white'} 
                h-12  rounded flex items-center gap-3 px-5 cursor-pointer hover:bg-blue-gradient hover:text-white`}>
                {imgSrc && <img src={imgSrc} className="h-7 w-7" alt={title} />}
                <p className="text-sm font-medium">{title}</p>
            </Link>
        );
    }

    // Jika tipe adalah 'link', gunakan Link dengan ikon
    return (
        <Link
            to={url}
            className={`${location.pathname === url ? 'text-white bg-primary' : 'text-primary bg-white'} 
                h-10 px-4 rounded border border-primary flex items-center gap-2 cursor-pointer hover:bg-primary hover:text-white`}
        >
            {icon && <FontAwesomeIcon icon={icon} className="" />}
            <p className="text-sm font-medium">{title}</p>
        </Link>
    );
};

export default ButtonNavigation
