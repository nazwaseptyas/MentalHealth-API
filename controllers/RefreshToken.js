import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


export const refreshToken = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;
        // return res.json({ data: req.cookies });

        if (!refreshToken) return res.sendStatus(401);

        const user = await prisma.user.findMany({
            where: {
                refresh_token: refreshToken,
            }
        });

        if (!user.length) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const { id, name, email } = user;
            // const userId = user.id;
            // const name = user.name;
            // const email = user.email;
            const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '45s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}