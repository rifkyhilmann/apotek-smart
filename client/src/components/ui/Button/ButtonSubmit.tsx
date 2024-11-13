import ReactLoading from 'react-loading';

interface pageProps {
    title: string;
    onClick: () => void;
    isLoading?: boolean;
    height?: string;  // height dapat di-customize
    width?: string;   // width dapat di-customize
}

const ButtonSubmit: React.FC<pageProps> = ({ title, onClick, isLoading, height = 'h-10', width = 'w-full' }) => {
    return (
        <button type='submit'
            className={`hover:opacity-80
                flex items-center justify-center rounded-lg cursor-pointer
                text-white bg-[#0255a3] 
                ${height} ${width}  // Menggunakan kelas Tailwind untuk height dan width
            `}
            onClick={onClick}
        >
            {isLoading ? (
                <ReactLoading type={'spin'} color={'#ffffff'} height={20} width={20} />
            ) : (
                <p className='font-bold text-sm'>{title}</p>
            )}
        </button>
    );
};

export default ButtonSubmit;
