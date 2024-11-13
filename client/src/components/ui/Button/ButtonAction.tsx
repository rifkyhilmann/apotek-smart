import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    onClick : () => void;
    title : string;
    icons : IconDefinition
}

const ButtonAction = ({ onClick, icons, title }: Props) => {
    return (
        <div 
            onClick={onClick}  
            className="px-3 flex items-center gap-2 bg-gray-200 border-gray-300 border cursor-pointer h-8 rounded text-black text-xs hover:bg-gray-300"
        >
            <FontAwesomeIcon icon={icons} /> 
            <p>{title}</p> 
        </div>
    );
}

export default ButtonAction;

