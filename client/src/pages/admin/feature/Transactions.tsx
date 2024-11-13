import { IconsObat } from "@/assets"
import DataPembelian from "@/components/feature/Transaction/DataPembelian";
import DataPenjualan from "@/components/feature/Transaction/DataPenjualan";
import ButtonNavigation from "@/components/ui/Button/ButtonNavigation";
import { Route, Routes } from "react-router-dom"


const Transaction = () => {

    return (
        <div className="my-5 flex flex-col flex-grow">
            <div className="h-14 w-full  flex items-center gap-3">
                <ButtonNavigation 
                    type="menu"
                    imgSrc={IconsObat}
                    title="Penjualan"
                    url="/pages/transactions"
                />
                <ButtonNavigation 
                    type="menu"
                    imgSrc={IconsObat}
                    title="Pembelian"
                    url="/pages/transactions/pembelian"
                />
            </div>
            <Routes>
                <Route path="/" element={<DataPenjualan />} />
                <Route path="/pembelian/*" element={<DataPembelian />} />
            </Routes>
        </div>
    )
}

export default Transaction