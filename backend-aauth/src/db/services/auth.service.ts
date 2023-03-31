import {RegisterDto} from "../dto/register.dto";
import {UserDto} from "../dto/user.dto";
import {LoginDto} from "../dto/login.dto";
import {DecodedTokenDto} from "../dto/decoded-token.dto";
import {UserDataDto} from "../dto/user-data.dto";
import {dbService} from "../../main";
import {cryptoService} from "../../main";

export class AuthService {

    constructor() {
    }

    public async register(user: RegisterDto): Promise<UserDataDto | undefined> {
        return new Promise<UserDataDto | undefined>((resolve) => {
            dbService.checkIfUserExists(user).then(async exists => {
                if (exists) resolve(undefined)
                else {
                    const createdUser = await dbService.saveUser(user)
                    resolve({
                        uid: createdUser.uid,
                        username: createdUser.username,
                        email: createdUser.email,
                    })
                }
            })
        })
    }

    public async login(loginDto: LoginDto): Promise<UserDataDto | undefined> {
        return new Promise<UserDataDto | undefined>(async resolve => {
            const user = await dbService.findUserByEmail(loginDto.email);
            if (!user) resolve(undefined);
            else if (!(await cryptoService.comparePasswords(loginDto.password, user.password))) resolve(undefined)
            else {
                resolve({
                    uid: user.uid,
                    username: user.username,
                    email: user.email,
                });
            }
        })
    }

    public async refresh(refreshToken: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            const decoded: DecodedTokenDto | undefined = cryptoService.decodeRefreshToken(refreshToken);
            if (!decoded || !(await dbService.findUserByUid(decoded.uid))) {
                reject()
            } else {
                resolve(cryptoService.createAccessToken(decoded.uid, decoded.email));
            }
        })
    }

    public async authenticate(accessToken: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            const decoded: DecodedTokenDto | undefined = cryptoService.decodeRefreshToken(accessToken);
            if (!decoded || !(await dbService.findUserByUid(decoded.uid))) {
                reject()
            } else {
                resolve(true);
            }
        })
    }
}


