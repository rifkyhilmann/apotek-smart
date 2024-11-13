import { faAdd } from "@fortawesome/free-solid-svg-icons"
import ModalsTable from "@/components/ui/Modals/ModalsTable";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import TableData from "@/components/ui/Table/TableData";
import { ColumnPenjualan } from "@/utils/data";

const DataPenjualan = () => {
    const [tanggal, setTanggal] = useState<string>("");
    const [fakturValue, setFakturValue] = useState<string>("");
    const [selectedPayment, setSelectedPayment] = useState<string>("");
    // const [dataPenjualan, setData] = useState([]);

    useEffect(() => {
        const today = new Date();
        const defaultDate = today.toISOString().split("T")[0]; // Format YYYY-MM-DD
        setTanggal(defaultDate);
    }, []);

    const payment = [
        { 
            payment : 'Tunai'
        },
        { 
            payment : 'Transfer'
        }
    ]

    const data = {
        tanggal : tanggal,
        faktur : fakturValue,
        payment : selectedPayment
    }

    console.log(data)

    const DataPenjualan = [
        {
        faktur: 'FKT1234',
        tanggal: '2024-11-13',
        waktu: '2024-11-13 10:00:00',
        pembayaran: 'Cash',
        total: 150000,
        total_laba: 30000,
        },
        {
        faktur: 'FKT1235',
        tanggal: '2024-11-14',
        waktu: '2024-11-14 11:15:00',
        pembayaran: 'Credit Card',
        total: 250000,
        total_laba: 50000,
        },
        {
        faktur: 'FKT1236',
        tanggal: '2024-11-15',
        waktu: '2024-11-15 14:30:00',
        pembayaran: 'Bank Transfer',
        total: 120000,
        total_laba: 24000,
        },
    ];
  
    
    return (
        <div className="mt-5 w-full flex-1 bg-white rounded p-3 flex flex-col gap-5">
            <div className="h-10 w-full bg-blue-50 rounded-lg flex items-center p-2">
                <p className="text-blue-900 font-semibold">Data Penjualan</p>
            </div>
            <div className="w-full flex-1 border overflow-y-auto min-h-[300px] custom-scrollbar">

            </div>
            <div className="h-8 w-full flex items-center justify-between "> 
                <ModalsTable icons={faAdd} title="Tambah" width="w-[700px]">
                    <>
                        <p className="font-semibold">Tambah Penjualan</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                                <p className="w-32 text-sm font-medium">Tanggal</p>
                                <input 
                                    type="date" 
                                    className="w-48 h-8 border px-2 rounded text-sm" 
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <p className="w-32 text-sm font-medium">Faktur</p>
                                <input 
                                    type="text" 
                                    className="w-48 h-8 border px-2 rounded text-sm active:outline-none"
                                    value={fakturValue}
                                    onChange={(e) => setFakturValue(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <p className="w-32 text-sm font-medium">Pembayaran</p>
                                <select 
                                    name="" 
                                    id="" 
                                    value={selectedPayment}
                                    onChange={(e) => setSelectedPayment(e.target.value)}
                                    className="w-44 h-8 border px-2 rounded text-sm active:outline-none" 
                                >
                                    <option value="">Select Payment</option>
                                    {payment.map((items, index) => (
                                        <option key={index} value={items.payment}>{items.payment}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-5 mt-5">
                                <div className="h-10 w-full flex items-center gap-2 ">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium">Kode Obat</span>
                                        <input type="text" className="w-20 h-8 border rounded" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium">Nama</span>
                                        <input type="text" className="w-40 h-8 border rounded" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium">Jumlah</span>
                                        <input type="number" className="w-20 h-8 border rounded" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium">Satuan</span>
                                        <input disabled type="number" className="w-20 h-8 border rounded" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium">Harga</span>
                                        <input disabled type="number" className="w-24 h-8 border rounded" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium">Total</span>
                                        <input disabled type="number" className="w-20 h-8 border rounded" />
                                    </div>
                                </div>

                                <div className="w-full border overflow-y-auto overflow-x-hidden h-[150px] custom-scrollbar">
                                    <TableData 
                                        columns={ColumnPenjualan}
                                        rows={DataPenjualan}
                                    />
                                </div>
                                
                                <div className="flex items-center gap-4 h-[120px] w-full bg-gray-100 p-2">
                                    <div className="flex flex-col gap-1 h-full">
                                        <div className="flex items-center">
                                            <p className="w-20 text-sm font-medium">Total</p>
                                            <input 
                                                type="text" 
                                                className="w-48 h-8 border px-2 rounded text-sm active:outline-none"
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <p className="w-20 text-sm font-medium">Bayar</p>
                                            <input 
                                                type="text" 
                                                className="w-48 h-8 border px-2 rounded text-sm active:outline-none"
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <p className="w-20 text-sm font-medium">Kembali</p>
                                            <input 
                                                type="text" 
                                                className="w-48 h-8 border px-2 rounded text-sm active:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="h-full flex flex-1 flex-col justify-between">
                                        <div className="w-full h-14 bg-gray-300 rounded"></div>
                                        <div className="w-full h-10 flex items-center gap-2">
                                            <div className="flex items-center px-3 h-8 text-xs gap-2 border rounded">
                                                <FontAwesomeIcon icon={faSave} />
                                                <p>Simpan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </ModalsTable>
            </div>
        </div>
    )
}

export default DataPenjualan