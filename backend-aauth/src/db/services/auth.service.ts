import {dbService} from "./db.service";
import {RegisterDto} from "../dto/register.dto";
import {UserDto} from "../dto/user.dto";
import {LoginDto} from "../dto/login.dto";
import {cryptoService} from "./crypto.service";
import {DecodedTokenDto} from "../dto/decoded-token.dto";

class AuthService {

    private dbService = dbService;
    private cryptoService = cryptoService;

    constructor() {
    }

    public async register(user: RegisterDto): Promise<UserDto | undefined> {
        return new Promise<UserDto | undefined>((resolve) => {
            dbService.checkIfUserExists(user).then(async exists => {
                if (exists) resolve(undefined)
                else {
                    const createdUser = await dbService.saveUser(user)
                    resolve({
                        uid: createdUser.uid,
                        username: createdUser.username,
                        email: createdUser.email,
                        password: createdUser.password
                    })
                }
            })
        })
    }

    public async login(loginDto: LoginDto): Promise<UserDto | undefined> {
        return new Promise<UserDto | undefined>(async resolve => {
            const user = await dbService.findUserByEmail(loginDto.email);
            if (!user) resolve(undefined);
            else if (!(await this.cryptoService.comparePasswords(loginDto.password, user.password))) resolve(undefined)
            else {
                resolve({
                    uid: user.uid,
                    username: user.username,
                    email: user.email,
                    password: user.password
                });
            }
        })
    }

    public async refresh(refreshToken: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            const decoded: DecodedTokenDto | undefined = this.cryptoService.decodeToken(refreshToken);
            if (!decoded || !(await this.dbService.findUserByUid(decoded.uid))) {
                reject()
            } else {
                resolve(this.cryptoService.createAccessToken(decoded.uid, decoded.email));
            }
        })
    }
}

export const authService = new AuthService();
