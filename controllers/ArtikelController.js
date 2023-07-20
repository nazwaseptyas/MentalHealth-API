import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDataArtikel = async (req, res) => {
  try {
    const response = await prisma.artikel.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createArtikel = async (req, res) => {
  const { gambar
    //  email, alamat, nohp, keluhan, tanggal
  } = req.body;
  try {
    const artikel = await prisma.artikel.create({
      data: {
        gambar,
        // email,
        // alamat,
        // nohp,
        // keluhan,
        // tanggal,
      },
    });
    res.status(201).json(artikel);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
