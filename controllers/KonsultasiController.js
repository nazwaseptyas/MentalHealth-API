import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDataKonsultasi = async (req, res) => {
  try {
    const response = await prisma.konsultasi.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createKonsultasi = async (req, res) => {
  const { nama, email, alamat, nohp, keluhan, tanggal } = req.body;
  try {
    const konsultasi = await prisma.konsultasi.create({
      data: {
        nama,
        email,
        alamat,
        nohp,
        keluhan,
        tanggal,
      },
    });
    res.status(201).json(konsultasi);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
