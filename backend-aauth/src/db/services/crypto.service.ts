import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken';
import {DecodedTokenDto} from "../dto/decoded-token.dto";

class CryptoService {

    public hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    public createRefreshToken(uid: string, email: string) {
        return jwt.sign({
            uid: uid,
            email: email
        }, process.env.REFRESH_TOKEN_KEY as string, { expiresIn: '1d' })
    }

    public createAccessToken(uid: string, email: string) {
        return jwt.sign({
            uid: uid,
            email: email
        }, process.env.ACCESS_TOKEN_KEY as string, { expiresIn: '10m' })
    }

    public comparePasswords(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }

    decodeToken(refreshToken: string): DecodedTokenDto | undefined {
        try {
            return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY as string) as DecodedTokenDto;
        } catch {
            return undefined;
        }
    }
}

export const cryptoService = new CryptoService();