// @ts-ignore
import express from 'express'
import {AuthHandler} from "./auth/auth.handler";
import { DataHandler } from './data/data.handler';
import * as bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import {AuthService} from "./db/services/auth.service";
import {CryptoService} from "./db/services/crypto.service";
import {DbService} from "./db/services/db.service";
const cookieParser = require('cookie-parser');
const cors = require('cors')

dotenv.config();

const app = express()
const port: number = 3000
app.use(cors())
app.use(cookieParser())

dotenv.config();
const jsonParser = bodyParser.json();
app.use(jsonParser);

const authHandler: AuthHandler = new AuthHandler(app);
authHandler.registerEndpoints();
const dataHandler: DataHandler = new DataHandler(app);
dataHandler.registerEndpoints();

export const authService = new AuthService()
export const cryptoService = new CryptoService();
export const dbService: DbService = new DbService();

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
