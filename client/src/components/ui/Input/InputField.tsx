import { faEye, faEyeSlash, IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Props {
    title: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icons?: IconDefinition;
    width?: string;  
    height?: string;
}

const InputField: React.FC<Props> = ({
    title, 
    value, 
    type, 
    onChange, 
    width = 'w-full', // Default width is w-full if not provided
    height = 'h-10' // Default height is h-10 if not provided
}) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`flex flex-col w-full gap-2`}>
            <span className="text-sm font-medium">
                {title}
            </span>
            <div className={`w-full ${height} border rounded flex items-center px-3 gap-4 font-poppins`}>
                <input 
                    type={type === 'password' ? (isActive ? 'text' : 'password') : type} 
                    onChange={onChange} 
                    value={value}
                    className={`text-sm h-full flex flex-1 focus:outline-none font-poppins bg-transparent ${width}`}
                    placeholder={`Enter your ${title}`}
                />
                {type === 'password' && (
                    <FontAwesomeIcon 
                        className="cursor-pointer text-gray-400"  
                        icon={isActive ? faEyeSlash : faEye}
                        onClick={() => setIsActive(!isActive)}
                    />
                )}
            </div>
        </div>
    );
};

export default InputField;
