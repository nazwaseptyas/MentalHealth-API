import express from 'express';
import { createArtikel, deleteArtikel, getDataArtikel } from '../controllers/ArtikelController.js';

const router = express.Router();

router.post('/artikel', createArtikel);
router.get('/artikel', getDataArtikel);
router.delete('/artikel/:id', deleteArtikel);

export default router;
