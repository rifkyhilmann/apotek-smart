import { useState } from "react"
import Modals from "./Modals";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface props {
    children : React.ReactElement;
    icons : IconDefinition;
    title? : string;
    width? : string;
}

const ModalsTable:React.FC<props> = ({children, icons, title, width}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>  
            <div 
                onClick={openModal}
                className="px-3 flex items-center border border-gray-300 gap-2 bg-gray-200 cursor-pointer h-8 rounded text-black text-xs hover:bg-gray-300">
                <FontAwesomeIcon icon={icons} />
                <p>{title}</p>
            </div>
            <Modals isOpen={isOpen} onClose={closeModal} width={width}>
                <div className="flex flex-col w-full gap-5 text-black">
                    {children}
                </div>
            </Modals>
        </>
    )
}

export default ModalsTable