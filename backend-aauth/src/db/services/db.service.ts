import * as mongoose from "mongoose";
import {Connection} from "mongoose";
import {userModel} from "../schemas/user.schema";
import {RegisterDto} from "../dto/register.dto";
import {UserDto} from "../dto/user.dto";
import {randomBytes} from "crypto";
import {UserDataDto} from "../dto/user-data.dto";
import {cryptoService} from "../../main";


export class DbService {

    private connection: Connection | undefined = undefined;
    private uri = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.IP}:27017/${process.env.DBNAME}`;
    private cryptoService = cryptoService;

    constructor() {
        mongoose.connect(this.uri)
    }

    public async saveUser(userDto: RegisterDto): Promise<UserDataDto> {
        return new Promise<UserDataDto>(async (resolve) => {
            const user = new userModel(await this.createNewUser(userDto))
            user.save(() => {
                resolve({uid: user.uid, username: user.username, email: user.email});
            })
        })
    }

    public async checkIfUserExists(user: RegisterDto): Promise<boolean> {
        return new Promise<boolean>( async (resolve) => {
            const foundUser = await this.findUserByEmail(user.email)
            if (foundUser) resolve(true);
            resolve(false);
        })
    }

    async findUserByEmail(email: string) {
        return userModel.findOne({email: email})
    }

    async findUserByUid(uid: string) {
        return userModel.findOne({uid: uid})
    }

    private async createNewUser(userAuth: RegisterDto): Promise<UserDto> {
        return new Promise<UserDto>(async resolve => {
            const uid = await this.createUserId();
            let user: UserDto = {
                uid: uid,
                username: userAuth.username,
                email: userAuth.email,
                password: await this.cryptoService.hashPassword(userAuth.password),
            };
            resolve(user);
        })
    }

    private async createUserId(): Promise<string> {
        return new Promise<string>((resolve) => {
            let uid = randomBytes(16).toString('hex');
            this.uidExists(uid).then(async exists => {
                if (exists) {
                    uid = await this.createUserId();
                }
                resolve(uid);
            })
        })
    }

    private async uidExists(uid: string): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            userModel.findOne({uid: uid}).then((user) => {
                resolve(!!user);
            })
        })
    }
}


