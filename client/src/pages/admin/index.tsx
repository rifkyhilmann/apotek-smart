import Navbar from "@/components/ui/Navbar/Navbar"
import Sidebar from "@/components/ui/Sidebar/Sidebar"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./feature/Dashboard"
import MasterData from "./feature/MasterData"

const Pages = () => {
    return (
        <div className="w-full h-screen  flex items-center bg-gray-100 gap-5 font-poppins relative">
            <Sidebar />
            <div className="w-full h-screen flex flex-col mr-5">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/master-data/*" element={<MasterData />} />
                </Routes>
            </div>
        </div>
    )
}

export default Pages