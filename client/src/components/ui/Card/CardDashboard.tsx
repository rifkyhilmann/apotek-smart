
interface Props {
    icon : string
    title : string;
    count : number;
}

const CardDashboard = ({icon, title, count} : Props) => {
    return (
        <div className="h-20 bg-gray-200 rounded-lg flex items-center px-4 gap-5">
            <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center">
                <img src={icon} className="h-8 w-8" alt="" />
            </div>
            <div className="flex flex-col gap-2 text-primary ">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs font-bold">{count}</p>
            </div>
        </div>
    )
}

export default CardDashboard