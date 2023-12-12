import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/site';
import bodyParser from 'body-parser';
import db from './config/connectDB';
import cors from 'cors'
require('dotenv').config();


const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
// connect db
db.mongooseBD();

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true,  parameterLimit: 1000000 }));
app.use(cors(corsOptions))
const PORT = process.env.PORT || 1611;
const hostname = process.env.HOST_NAME;
//config view engine
configViewEngine(app);

//init web Route
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`${hostname}:${PORT}`);
});
