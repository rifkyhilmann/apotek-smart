import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  children: React.ReactNode; // Gunakan React.ReactNode untuk mendukung berbagai jenis konten
  isOpen: boolean;
  onClose: () => void;
  width? : string;
}

const Modals: React.FC<Props> = ({ children, isOpen, onClose, width }) => {
  return (
    <div
      onClick={onClose}
      className={`${
        isOpen ? 'flex' : 'hidden'
      } fixed top-0 left-0 w-full h-full modals bg-opacity-50 z-50 items-center justify-center`}>
      <div
        className={`${width ? width : 'w-[450px]'}
          h-max min-h-[200px]   bg-white rounded-lg shadow-xl px-6 py-7 font-poppins relative`}
        onClick={(e) => e.stopPropagation()} // Prevent click on modal content from closing the modal
      >
        <div
          onClick={onClose}
          className="h-7 w-7 text-xs bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-full absolute top-2 right-2 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faX} className="text-white" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modals;
