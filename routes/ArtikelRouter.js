import express from 'express';
import { createArtikel, getDataArtikel } from '../controllers/ArtikelController.js';

const router = express.Router();

router.post('/artikel', createArtikel);
router.get('/artikel', getDataArtikel);

export default router;
