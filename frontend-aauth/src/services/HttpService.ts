import axios from "axios";
import {LoginData} from "@/models/LoginData";
import {RegisterData} from "@/models/RegisterData";

let redirectUrl: string;
let redirectTitle: string;

const post = async (url: string, payload: string): Promise<any> => {
    return await axios.post(url, payload)
}

export const login = async (loginData: LoginData): Promise<void> => {
    await post('/login', JSON.stringify(loginData));
}

export const register = async (registerData: RegisterData): Promise<void> => {
    await post('/register', JSON.stringify(registerData))
}

export const saveRedirectUrl = (url: string) => {
    redirectUrl = url;
}

export const saveRedirectTitle = (title: string) => {
    redirectTitle = title;
}

export const getRedirectUrl = () => redirectUrl;

export const getRedirectTitle = () => redirectTitle;
