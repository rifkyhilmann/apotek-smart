import { faAdd, faPen, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalsTable from "@/components/ui/Modals/ModalsTable";
import { Data } from "@/middlewares/api";
import { useEffect, useState } from "react";
import TableData from "@/components/ui/Table/TableData";
import { showConfirmDialog, showDialog, showToast } from "@/utils/alertUtils";
import InputField from '../../ui/Input/InputField';

const DataSatuan = () => {
    const [data, setData] = useState([]);
    const [selectId, setSelectId] = useState('');
    const [nameSatuan, setNameSatuan] = useState('');
    const [nameUpdate, setNameUpdate] = useState('')

    const fetchData = async () => {
        try {
            const response = await Data.GetSatuan()
            setData(response?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchGetDataById = async () => {
        try {
            const response = await Data.GetSatuanById(selectId);

            setNameUpdate(response.data[0].name);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUpdate = async () => {
        try {
            const response = await Data.UpdateSatuan(selectId, nameUpdate);

            if (response.status === 200) {
                fetchData();
                showToast('success', 'Berhasil update data');
            }
        } catch (error : any) {
            if (error.response.status === 400) {
                showDialog('warning','warning', 'Id tidak terdaftar')
            } else {
                showDialog('error','error', 'Server error')
            }
        }
    }

    const fetchAddData = async () => {
        try {
            const response = await Data.CreateSatuan(nameSatuan)

            if (response.status === 200) {
                fetchData();
                showToast('success', 'Berhasil menambahkan');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDeleteData = async () => {
        try {
            const response = await Data.DeleteSatuan(selectId);

            if (response.status === 200) {
                fetchData();
                showToast('success', 'Berhasil menghapus');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAdd = () => {
        if (nameSatuan) {
            fetchAddData();
        } else {
            showDialog('error', 'Error', 'Nama Kategori tidak boleh kosong')
        }
        setNameSatuan('')
    }

    const handleDelete = async () => {
        if(selectId) {
            const confirmed = await showConfirmDialog('Hapus Data', "Apakah Anda yakin ingin menghapus data ini?")

            if (confirmed) {
                fetchDeleteData();
            } else {
                setSelectId('')
            }
        } else {
            showDialog('error', 'Error', "Pilih salah satu data")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchGetDataById();
    }, [selectId])

    const columns = [
        { id: 'id', label: 'Id' },
        { id: 'name', label: 'Category' },
    ];
    
    const refresh = () => {
        fetchData()
    }

    const handleRowClick = (id: any) => {
        setSelectId(id);
    };

    const handleUpdate = () => {
        if (!selectId) {
            showDialog('warning', 'Warning', 'Pilih salah satu data');
        } else if (!nameUpdate) {
            showToast('warning', 'Nama kategori tidak boleh kosong');
        } else {
            fetchUpdate();
        }
    }

    return (
        <div className="mt-5 w-full flex-1 bg-white rounded p-3 flex flex-col gap-5">
            <div className="h-10 w-full bg-blue-50 rounded-lg flex items-center p-2">
                <p className="text-blue-900 font-semibold">Data Satuan</p>
            </div>

            <div className="w-full flex-1 border overflow-y-auto min-h-[300px]  custom-scrollbar">
                <TableData 
                    columns={columns}
                    rows={data}
                    onRowClick={handleRowClick}
                    selectedId={selectId}
                />
            </div>

            <div className="h-8 w-full flex items-center justify-between ">
                <div className="flex items-center gap-2">
                    <ModalsTable icons={faAdd} title="Tambah">
                        <>
                            <p className="font-medium">Tambah Category</p>
                            <div className="flex flex-col items-center gap-2">
                                <InputField
                                    value={nameSatuan}
                                    onChange={(e) => setNameSatuan(e.target.value)}
                                    title="Nama Satuan"
                                />

                                <button onClick={handleAdd} className="px-7 h-10 bg-blue-gradient rounded mt-5 text-white">
                                    Simpan
                                </button>
                            </div>
                        </>
                    </ModalsTable>
                    <ModalsTable icons={faPen} title="Update">
                        <>
                            <p className="font-medium">Update Satuan</p>
                            <div className="flex flex-col items-center gap-2">
                                <InputField
                                    value={nameUpdate}
                                    onChange={(e) => setNameUpdate(e.target.value)}
                                    title="Nama Satuan"
                                />

                                <button onClick={handleUpdate} className="px-7 h-10 bg-blue-gradient rounded mt-5 text-white">
                                    Simpan
                                </button>
                            </div>
                        </>
                    </ModalsTable>
                    <div onClick={handleDelete} className="px-3 flex items-center gap-2 bg-gray-200 border-gray-300 border cursor-pointer h-8 rounded text-black text-xs hover:bg-gray-300">
                        <FontAwesomeIcon icon={faTrash} />
                        <p>Hapus</p>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <div onClick={refresh} className="px-3 flex items-center gap-2 bg-gray-200 border-gray-300 border cursor-pointer h-8 rounded text-black text-xs hover:bg-gray-300">
                        <FontAwesomeIcon icon={faRefresh} />
                        <p>Refresh</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataSatuan
