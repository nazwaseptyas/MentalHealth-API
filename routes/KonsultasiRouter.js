import express from 'express';
import { createKonsultasi, getDataKonsultasi } from '../controllers/KonsultasiController.js';

const router = express.Router();

router.post('/tambah-konsultasi', createKonsultasi);
router.get('/konsultasi', getDataKonsultasi);

export default router;
