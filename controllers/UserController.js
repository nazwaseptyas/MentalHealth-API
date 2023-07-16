import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Register = async (req, res) => {
  const { username, nama, email, password } = req.body;

  try {
    await prisma.user.create({
      data: {
        username,
        nama: nama,
        email: email,
        password: password,
      },
    });

    res.json({ msg: 'Register Berhasil' });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const Login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user == null)
      return res.status(400).json({ msg: 'User Tidak terdaftar' });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: 'Wrong Password' });
    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '50s',
      },
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
    );

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true
    });
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await prisma.user.findMany({
      where: {
        refresh_token: refreshToken,
      },
    });

    // res.json(refreshToken);
    if (!user.length) return res.sendStatus(204);
    const userId = user[0].id;
    // UPDATE user set refresh_token = null where id =3

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: null,
      },
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
// export const Logout = async (req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     if (!refreshToken) return res.sendStatus(204);
//     const user = await prisma.user.findMany({
//         where: {
//             refresh_token: refreshToken
//         }
//     });

//     if (!user.length) return res.sendStatus(204);
//     const userId = user.id;
//     // UPDATE user set refresh_token = null where id =3

//     await prisma.user.update({
//         where: {
//             id: 3
//         },
//         data: {
//             refresh_token: "null"
//         }
//     });

//     res.clearCookie('refreshToken');
//     return res.sendStatus(200);
// }
