import axios from "axios";
import {LoginData} from "@/models/LoginData";
import {RegisterData} from "@/models/RegisterData";

let redirectUrl: string;
let redirectTitle: string;
const baseUrl = 'http://localhost:3000'

const post = async (url: string, payload: any): Promise<any> => {
    return await axios.post(`${baseUrl}${url}`, payload, { withCredentials: true });
}

export const login = async (loginData: LoginData): Promise<void> => {
    const response = await post('/login', loginData);
}

export const register = async (registerData: RegisterData): Promise<void> => {
    await post('/register', registerData)
}

export const saveRedirectUrl = (url: string) => {
    redirectUrl = url;
}

export const saveRedirectTitle = (title: string) => {
    redirectTitle = title;
}

export const getRedirectUrl = () => redirectUrl;

export const getRedirectTitle = () => redirectTitle;
