import express from 'express';
import { createKonsultasi } from '../controllers/KonsultasiController.js';

const router = express.Router();

router.post('/tambah-konsultasi', createKonsultasi);

export default router;
