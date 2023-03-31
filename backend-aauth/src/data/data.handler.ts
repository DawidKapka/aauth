import {Express, Request, Response} from "express";
import {HttpResponse} from "../db/util/http-response";
import {cryptoService, dbService} from "../main";
import {UserDataDto} from "../db/dto/user-data.dto";

type AuthorizationCallback = (req: Request, res: Response, uid: string) => void;

export class DataHandler {

    private app: Express;

    constructor(app: Express) {
        this.app = app;
    }

    public registerEndpoints(): void {
        this.app.get('/user', (req: Request, res: Response) => this.authorize(req, res, this.getUserInfo))
    }

    private authorize(req: Request, res: Response, callback: AuthorizationCallback) {
        if (!req.cookies.accessToken) {
            res.status(HttpResponse.UNAUTHORIZED).send()
        } else {
            const decodedToken = cryptoService.decodeAccessToken(req.cookies.accessToken);
            if (decodedToken) {
                callback(req, res, decodedToken.uid)
            } else {
                res.status(HttpResponse.UNAUTHORIZED).send()
            }
        }
    }

    private async getUserInfo(req: Request, res: Response, uid: string) {
        const user = await dbService.findUserByUid(uid);
        if (!user) {
            res.status(HttpResponse.BAD_REQUEST).send(`A user with the uid '${uid}' does not exist!`);
        } else {
            res.status(HttpResponse.OK).send(JSON.stringify({
                uid: user.uid,
                email: user.email,
                username: user.username
            } as UserDataDto))
        }
    }
}
