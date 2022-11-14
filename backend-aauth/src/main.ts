// @ts-ignore
import express from 'express'
import {AuthHandler} from "./auth/auth.handler";
import * as bodyParser from "body-parser";
import * as dotenv from 'dotenv';

const app = express()
const port: number = 3000

dotenv.config();
const jsonParser = bodyParser.json();
app.use(jsonParser);

const authHandler: AuthHandler = new AuthHandler(app);
authHandler.registerEndpoints();

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
