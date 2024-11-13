import { IconsUser } from "@/assets"
import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Navbar = () => {
    return (
        <div className="rounded-xl w-full h-14 bg-white my-1 flex items-center justify-between px-5">
            <p className="font-pridi text-xl font-semibold text-primary ">Apotek Smart</p>
            <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faMessage} className="text-lg" />
                <FontAwesomeIcon icon={faBell} className="text-lg" />
                <div className="flex items-center gap-3">
                    <img src={IconsUser} className="h-10 w-10 rounded-full object-cover" alt="" />
                    <div className="flex flex-col gap-1 ">
                        <p className="text-xs font-bold">rifkyhilman</p>
                        <p className="text-xs">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar