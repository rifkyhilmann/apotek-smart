const express = require('express');
const { SignIn, SignUp } = require('./v1/auth');
const { GetAllKategori, GetKategoriById, CreateKategori, UpdateKategori, DeleteKategori } = require('./v1/category');
const { GetAllSatuan, GetSatuanById, CreateSatuan, UpdateSatuan, DeleteSatuan } = require('./v1/satuan');
const { GetAllObat, GetObatByid, CreateObat, UpdateObat, DeleteObat } = require('./v1/obat');
const router = express.Router();

router.get('/v1/kategori', GetAllKategori)
router.get('/v1/kategori/:id', GetKategoriById)
router.get('/v1/satuan', GetAllSatuan)
router.get('/v1/satuan/:id', GetSatuanById);
router.get('/v1/obat', GetAllObat)
router.get('/v1/obat/:id', GetObatByid)

router.post('/v1/sign-in', SignIn)
router.post('/v1/sign-up', SignUp)
router.post('/v1/kategori', CreateKategori)
router.post('/v1/satuan', CreateSatuan)
router.post('/v1/obat', CreateObat)

router.put('/v1/obat/:id', UpdateObat)
router.put('/v1/kategori/:id', UpdateKategori)
router.put('/v1/satuan/:id', UpdateSatuan)

router.delete('/v1/kategori/:id', DeleteKategori)
router.delete('/v1/satuan/:id', DeleteSatuan)
router.delete('/v1/obat/:id', DeleteObat)

module.exports = router