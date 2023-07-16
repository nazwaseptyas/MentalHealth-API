import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ProductRoute from './routes/ProductRoute.js';
import UserRoute from './routes/UserRoute.js';

dotenv.config();

const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(cors({
//     origin: 'http://localhost:5173/',
//     credentials: true
// }));

app.use(express.json());
app.use(ProductRoute);
// app.use(UserRoute);
app.use('/', UserRoute);
// app.use("/test",);
// const userRouter = require("./routes/UserRoute");
// try {
//     await db.authenticate();
//     console.log('Database Connected...');
// } catch (error) {
// //    console.error(error);
// }

// app.use(cors({ credentials: true, origin: 'http://localhost:5173/' }));
// app.listen(process.env.APP_PORT, () => {
//     console.log('Server Jalan bang ');
// });
// app.listen(3000, function () {
//     console.log('Server listening on port ' + port);
// });
// let server = app.listen(5000, () => {
//     console.log('Listening', server.address().port)
// })
app.listen(5000, () => console.log('Server running at port 5000'));

// module.exports = app;
