import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useLocation } from "react-router-dom"

interface Props {
    icons: IconDefinition;  // Menggunakan `icon` hanya jika diperlukan
    url: string;
}

const SidebarMenu = ({icons, url} : Props) => {
    const location = useLocation()

    return (
        <Link to={url} className={`${location.pathname === url ? 'text-white bg-blue-gradient' : 'text-gray-400 bg-white'} 
          hover:bg-blue-gradient hover:text-white
        h-12 w-12 flex items-center justify-center rounded-xl cursor-pointer`}>
            <FontAwesomeIcon icon={icons} className="text-xl" />
        </Link>
    )
}

export default SidebarMenu