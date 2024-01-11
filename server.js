import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './config/connectDatabase.js';
import error from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import branchRoute from './routes/branchRoute.js';
import entriesRoute from './routes/entriesRoute.js';
import expenseRoute from './routes/expenseRoute.js';


const app = express();


// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()
app.use(morgan('dev'))
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: true}))



//CONNECT DATABASE
connectDatabase();

//CONTROLLERS
app.use('/api/v1/branch',branchRoute)
app.use('/api/v1/entries',entriesRoute)
app.use('/api/v1/expense',expenseRoute)


//CONNECT FRONTEND AND BACKEND USING STATIC FILES
if(process.env.ENVIROMENT==="production"){
    console.log(path.join(__dirname,'..','frontend','build'));
    app.use(express.static(path.join(__dirname,'..','frontend','build')));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'..','frontend','build','index.html'));
    })
}


//ERROR
app.use(error)

//PORT
const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`App Litening ${PORT} Port at ${process.env.ENVIROMENT} ...`);
})