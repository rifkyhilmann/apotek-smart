import { faAdd, faPen, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalsTable from "@/components/ui/Modals/ModalsTable";
import TableData from "@/components/ui/Table/TableData";
import { useEffect, useState } from "react";
import { Data } from "@/middlewares/api";
import { showConfirmDialog, showDialog, showToast } from "@/utils/alertUtils";
import InputField from "@/components/ui/Input/InputField";

const DataCategory = () => {
    const [data, setData] = useState([])
    const [nameCategoryValue, setNameCategoryValue] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const [selectId, setSelectId] = useState('')

    const fetchData = async () => {
        try {
            const response = await Data.GetKategori()
            setData(response?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchGetDataById = async () => {
        try {
            const response = await Data.GetKategoriById(selectId);

            setNameUpdate(response.data[0].name);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUpdate = async () => {
        try {
            const response = await Data.UpdateKategori(selectId, nameUpdate);

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
            const response = await Data.CreateKategori(nameCategoryValue);

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
            const response = await Data.DeleteKategori(selectId);

            if (response.status === 200) {
                fetchData();
                showToast('success', 'Berhasil menghapus');
            }
        } catch (error) {
            console.log(error);
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
        { id: 'name', label: 'Name Category' },
    ];

    const refresh = () => {
        fetchData()
    }

    const handleAdd = () => {
        if (nameCategoryValue) {
            fetchAddData();
        } else {
            showDialog('error', 'Error', 'Nama Kategori tidak boleh kosong')
        }
        setNameCategoryValue('')
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
        <div className="mt-5 w-full flex-1 bg-white rounded p-3 h-full flex flex-col gap-5">
            <div className="h-10 w-full bg-blue-50 rounded-lg flex items-center p-2">
                <p className="text-blue-900 font-semibold">Data Category</p>
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
                                    value={nameCategoryValue}
                                    onChange={(e) => setNameCategoryValue(e.target.value)}
                                    title="Nama Category"
                                />

                                <button onClick={handleAdd} className="px-7 h-10 bg-blue-gradient rounded mt-5 text-white">
                                    Simpan
                                </button>
                            </div>
                        </>
                    </ModalsTable>
                    <ModalsTable icons={faPen} title="Update">
                        <>
                            <p className="font-medium">Update Category</p>
                            <div className="flex flex-col items-center gap-2">
                                <InputField 
                                    value={nameUpdate}
                                    onChange={(e) => setNameUpdate(e.target.value)}
                                    title="Nama Category"
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
};

export default DataCategory;
