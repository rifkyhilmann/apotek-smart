import { useEffect, useState } from "react"
import { Data } from "@/middlewares/api"
import TableData from "@/components/ui/Table/TableData"
import ButtonAction from "@/components/ui/Button/ButtonAction";
import { faAdd, faPen, faPrint, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons/faFileExcel";
import { showConfirmDialog, showDialog, showToast } from "@/utils/alertUtils";
import ModalsTable from "@/components/ui/Modals/ModalsTable";
import { Form, Formik } from "formik";
import InputFormik from "@/components/ui/Input/InputFormik";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx';

const columns = [
    { id: 'kode', label: 'Kode' },
    { id: 'nama', label: 'Nama' },
    { id: 'harga_beli', label: 'Harga Beli' },
    { id: 'harga_jual', label: 'Harga Jual' },
    { id: 'laba', label: 'Laba' },
    { id: 'stock', label: 'Stock' },
    { id: 'expired', label: 'Exp' },
    { id: 'kategori', label: 'Kategori' },
    { id: 'satuan', label: 'Satuan' },
];

const DataObat = () => {
    const [dataObat, setDataObat] = useState([]);
    const [dataKategori, setDataKategori] = useState([]);
    const [dataSatuan, setDataSatuan] = useState([]);
    const [selectId, setSelectId] = useState('');
    const [initialValues, setInitialValues] = useState({
        kode: '',
        nama: '',
        harga_beli: '',
        harga_jual: '',
        stock: '',
        expired: '',
        kategori_id: '',
        satuan_id: '',
        suplier: ''
    });
    const doc = new jsPDF('landscape');

    const initial = {
        kode: '',
        nama: '',
        harga_beli: '',
        harga_jual: '',
        stock: '',
        expired: '',
        kategori_id: '',
        satuan_id: '',
        suplier : ''
    };

    const fetchData = async () => {
        try {
            const response = await Data.GetAllObat();
            setDataObat(response?.data)
            const kategori = await Data.GetKategori();
            setDataKategori(kategori?.data);
            const satuan = await Data.GetSatuan();
            setDataSatuan(satuan.data);
        } catch (error) {
            
        }
    }

    const fetchGetDataById = async () => {
        try {
            const response = await Data.GetObatById(selectId);
            const obat = response?.data;

            setInitialValues({
                kode: obat.kode,
                nama: obat.nama,
                harga_beli: obat.harga_beli,
                harga_jual: obat.harga_jual,
                stock: obat.stock,
                expired: obat.expired,
                kategori_id: obat.kategori_id,
                satuan_id: obat.satuan_id,
                suplier: obat.suplier,
            });

        } catch (error) {
            console.log(error);
        }
    }

    const fetchPostData = async (data : any) => {
        try {
            const response = await Data.CreateObat(data)

            if (response.status === 200) {
                showToast('success', 'Berhasil menambahkan data')
                fetchData();
            }
        } catch (error : any) {
            if (error.response.status === 400) {
                showDialog('error', 'error', 'Kode obat sudah terdaftar')
            } else if (error.response.status === 402) {
                showDialog('error', 'error', 'Gagal Membuat data obat')
            } else {
                showDialog('error', 'error', 'Server error')
            }
        }
    }

    const fetchDeleteData = async () => {
        try {
            const response = await Data.DeleteObat(selectId);

            if (response.status === 200) {
                fetchData();
                showToast('success', 'Berhasil di hapus');
                setSelectId('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        if (selectId) {
            const confirmed = await showConfirmDialog("Hapus Data", 'Apakah anda yakin untuk menghapus?')

            if (confirmed) {
                fetchDeleteData();
            } else {
                setSelectId('')
            }
        } else {
            showDialog('error', 'Error', 'Pilih salah satu data')
        }
    }

    const fetchUpdateData = async (data : any) => {
        try {
            const response = await Data.UpdateObat( selectId ,data);

            if (response.status === 200) {
                showToast('success', 'Berhasil update data')
                fetchData();
                setSelectId('')
            }
        } catch (error : any) {
            if (error.response.status === 400) {
                showDialog('error', 'Error', 'Kode obat sudah terdaftar')
            } else {
                showDialog('error', 'Error', 'Gagal update data')
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (selectId) {
            fetchGetDataById();
        } else {
            setInitialValues({
                kode: '',
                nama: '',
                harga_beli: '',
                harga_jual: '',
                stock: '',
                expired: '',
                kategori_id: '',
                satuan_id: '',
                suplier: ''
            });
        }
    }, [selectId])

    const handleRefresh = () => {
        fetchData();
    }

    const validate = (values: any) => {
        const errors: any = {};
        if (!values.kode) errors.kode = 'Kode Obat wajib diisi';
        if (!values.nama) errors.nama = 'Nama Obat wajib diisi';
        if (!values.harga_beli) errors.harga_beli = 'Harga Beli wajib diisi';
        if (!values.harga_jual) errors.harga_jual = 'Harga Jual wajib diisi';
        if (!values.stock) errors.stock = 'Stock wajib diisi';
        if (!values.expired) errors.expired = 'Expired Obat wajib diisi';
        if (!values.kategori_id) errors.kategori_id = 'Kategori wajib dipilih';
        if (!values.satuan_id) errors.satuan_id = 'Satuan wajib dipilih';
        if (!values.suplier) errors.suplier = 'Suplier wajib diisi';
    
        if (values.harga_jual && values.harga_beli && values.harga_jual < values.harga_beli) {
            errors.harga_jual = 'Harga Jual tidak boleh lebih kecil dari Harga Beli';
        }
        return errors;
    };

    const handlePrint = () => {
        const body = dataObat.map((row : any) => [
            row.kode,
            row.nama,
            row.harga_beli,
            row.harga_jual,
            row.laba,
            row.stock,
            row.expired,
            row.kategori,
            row.satuan,
        ]);
    
        autoTable(doc, {
            columnStyles: { europe: { halign: 'center' } },
            theme: 'grid',
            head: [['Kode', 'Nama', 'Harga Beli', 'Harga Jual', 'Laba', 'Stock', 'Expired', 'Kategori', 'Satuan']],
            body: body,
            styles: {
                font: 'Helvetica',
                fontSize: 10,
                cellPadding: 2,
                overflow: 'linebreak',
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: [255, 255, 255],
                halign: 'center',
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            margin: { top: 10 },
        });
    
        doc.save('DataObat.pdf');
    }
    const handleExport = () => {
        const body = dataObat.map((row : any) => [
            row.kode,
            row.nama,
            row.harga_beli,
            row.harga_jual,
            row.laba,
            row.stock,
            row.expired,
            row.kategori,
            row.satuan,
        ]);

        const worksheet = XLSX.utils.json_to_sheet(body);
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Obat');
    
        XLSX.writeFile(workbook, 'DataObat.xlsx');
    }

    return (
        <div className="mt-5 w-full flex-1 bg-white rounded p-3 flex flex-col gap-5">
            <div className="h-10 w-full bg-blue-50 rounded-lg flex items-center p-2">
                <p className="text-blue-900 font-semibold">Data Obat</p>
            </div>

            {/* Table Data */}
            <div className="w-full flex-1 border overflow-y-auto min-h-[300px] custom-scrollbar">
                <TableData 
                    columns={columns}
                    rows={dataObat}
                    selectedId={selectId}
                    onRowClick={(id) => setSelectId(id)}
                />
            </div>
            
            {/* Button Action */}
            <div className="h-8 w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Trigger Add Data */}
                    <ModalsTable icons={faAdd} title="Tambah">
                        <>
                            <p>Tambah Obat</p>
                            <Formik
                                initialValues={initial}
                                validate={validate}
                                enableReinitialize={true}
                                onSubmit={(values, { resetForm }) => {
                                    resetForm();
                                    fetchPostData(values);
                                }}
                            >
                                <Form className="flex flex-col gap-2">
                                    <div className="grid grid-cols-2 gap-3">
                                        <InputFormik 
                                            title="Kode Obat"
                                            name="kode"
                                            type="text"
                                        />
                                        <InputFormik 
                                            title="Nama Obat"
                                            name="nama"
                                            type="text"
                                        />
                                        <InputFormik 
                                            title="Harga Beli"
                                            name="harga_beli"
                                            type="number"
                                        />
                                        <InputFormik 
                                            title="Harga Jual"
                                            name="harga_jual"
                                            type="number"
                                        />
                                        <InputFormik 
                                            title="Stock"
                                            name="stock"
                                            type="number"
                                        />
                                        <InputFormik 
                                            title="Expired"
                                            name="expired"
                                            type="date"
                                        />
                                        <InputFormik 
                                            type="select"
                                            options={dataKategori}
                                            title="Kategori"
                                            name="kategori_id"
                                        />
                                        <InputFormik 
                                            type="select"
                                            options={dataSatuan}
                                            title="Satuan"
                                            name="satuan_id"
                                        />
                                        <InputFormik 
                                            title="Suplier"
                                            name="suplier"
                                            type="text"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="h-9 px-7 mt-5 bg-blue-gradient rounded text-white font-medium text-sm hover:opacity-70"
                                    >
                                        Simpan
                                    </button>
                                </Form>
                            </Formik>
                        </>
                    </ModalsTable>

                    <ModalsTable icons={faPen} title="Update">
                        <>
                            <p>Update Data Obat</p>
                            <Formik
                                initialValues={initialValues}
                                validate={validate}
                                enableReinitialize={true}
                                onSubmit={(values, { resetForm }) => {
                                    resetForm();
                                    fetchUpdateData(values);
                                }}
                            >
                                <Form className="flex flex-col gap-2">
                                    <div className="grid grid-cols-2 gap-3">
                                        <InputFormik 
                                            title="Kode Obat"
                                            name="kode"
                                            type="text"
                                        />
                                        <InputFormik 
                                            title="Nama Obat"
                                            name="nama"
                                            type="text"
                                        />
                                        <InputFormik 
                                            title="Harga Beli"
                                            name="harga_beli"
                                            type="number"
                                        />
                                        <InputFormik 
                                            title="Harga Jual"
                                            name="harga_jual"
                                            type="number"
                                        />
                                        <InputFormik 
                                            title="Stock"
                                            name="stock"
                                            type="number"
                                        />
                                        <InputFormik 
                                            title="Expired"
                                            name="expired"
                                            type="date"
                                        />
                                        <InputFormik 
                                            type="select"
                                            options={dataKategori}
                                            title="Kategori"
                                            name="kategori_id"
                                        />
                                        <InputFormik 
                                            type="select"
                                            options={dataSatuan}
                                            title="Satuan"
                                            name="satuan_id"
                                        />
                                        <InputFormik 
                                            title="Suplier"
                                            name="suplier"
                                            type="text"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="h-9 px-7 mt-5 bg-blue-gradient rounded text-white font-medium text-sm hover:opacity-70"
                                    >
                                        Simpan
                                    </button>
                                </Form>
                            </Formik>
                        </>
                    </ModalsTable>

                    <ButtonAction 
                        icons={faTrash}
                        title="Delete"
                        onClick={handleDelete}
                    />
                </div>
                <div className="flex items-center justify-end gap-2">
                    <ButtonAction 
                        icons={faRefresh}
                        title="Refresh"
                        onClick={handleRefresh}
                    />
                    <ButtonAction 
                        icons={faPrint}
                        title="Cetak"
                        onClick={handlePrint}
                    />
                    <ButtonAction 
                        icons={faFileExcel}
                        title="Export"
                        onClick={handleExport}
                    />
                </div>
            </div>
        </div>
    )
}

export default DataObat