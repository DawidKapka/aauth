import {Express, Request, Response} from "express";
import {RegisterDto} from "../db/dto/register.dto";
import {HttpResponse} from "../db/util/http-response";
import {LoginDto} from "../db/dto/login.dto";
import {UserDataDto} from "../db/dto/user-data.dto";
import {cryptoService, dbService} from "../main";
import {authService} from "../main";

export class AuthHandler {

    private app: Express;

    constructor(app: Express) {
        this.app = app;
    }

    public registerEndpoints(): void {
        this.app.post('/register', (req: Request, res: Response) => this.register(req, res))
        this.app.post('/login', (req: Request, res: Response) => this.login(req, res))
        this.app.post('/refresh', (req: Request, res: Response) => this.refresh(req, res))
        this.app.post('/logout', (req: Request, res: Response) => this.logout(req, res))
    }

    private async register(req: Request, res: Response) {
        const registerDto = req.body as RegisterDto;
        if (!this.checkRegisterDto(registerDto)) {
            res.status(HttpResponse.BAD_REQUEST).send();
        } else {
            const user = await authService.register(registerDto);
            if (!user) res.status(HttpResponse.INTERNAL_SERVER_ERROR).send('A user with this email already exists!');
            else {
                const [accessToken, refreshToken] = this.createTokens(user);

                res.status(HttpResponse.CREATED)
                    .cookie('accessToken', accessToken)
                    .cookie('refreshToken', refreshToken)
                    .send(JSON.stringify(user))
            }
        }
    }

    private createTokens(user: UserDataDto): [string, string] {
        const accessToken = cryptoService.createAccessToken(user.uid, user.email);
        const refreshToken = cryptoService.createRefreshToken(user.uid, user.email);
        dbService.saveRefreshToken(user.uid, refreshToken);
        return [accessToken, refreshToken];
    }

    private async login(req: Request, res: Response) {
        const loginDto = req.body as LoginDto;
        if (!this.checkLoginDto(loginDto)) {
            res.status(HttpResponse.BAD_REQUEST).send();
        } else {
            const user = await authService.login(loginDto)
            if (!user) {
                res.status(HttpResponse.UNAUTHORIZED).send('Incorrect email or password!')
            } else {
                const [accessToken, refreshToken] = this.createTokens(user);
                res.status(HttpResponse.OK)
                    .cookie('accessToken', accessToken)
                    .cookie('refreshToken', refreshToken)
                    .send(JSON.stringify(user))
            }
        }
    }

    private async refresh(req: Request, res: Response) {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken || Object.keys(req.body).length !== 1) {
            res.status(HttpResponse.BAD_REQUEST).send();
        } else {
            this.checkRefreshToken(refreshToken).then(() => {
                authService.refresh(refreshToken).then(accessToken => {
                    res.status(HttpResponse.OK).cookie('accessToken', accessToken).send();
                }).catch(() => {
                    res.status(HttpResponse.UNAUTHORIZED).send('Invalid token!')
                });
            }).catch(() => res.status(HttpResponse.UNAUTHORIZED).send('Invalid token!'))
        }
    }

    private checkRegisterDto(dto: RegisterDto) {
        return !!(dto.username && dto.password && dto.email && Object.keys(dto).length === 3);
    }

    private checkLoginDto(dto: LoginDto) {
        return !!(dto.email && dto.password && Object.keys(dto).length === 2);
    }

    private logout(req: Request, res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        if (!req.cookies['refreshToken']) {
            res.status(HttpResponse.UNAUTHORIZED).send();
        } else {
            dbService.deleteRefreshToken(req.cookies['refreshToken']).then(() => {
                res.status(HttpResponse.OK).send();
            }).catch(() => {
                res.status(HttpResponse.UNAUTHORIZED).send();
            })
        }
    }

    private checkRefreshToken(refreshToken: any) {
        return new Promise<void>((resolve, reject) => {
            dbService.findUserByRefreshToken(refreshToken).then(user => {
                if (user) {
                    resolve()
                } else {
                    reject()
                }
            })
        })
    }
}
