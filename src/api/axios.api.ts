import axios from "axios";
import {getTokenFromLocalStorage} from "../helpers/localstorage.helper.ts";

export const instance = axios.create({
    baseURL:'http://localhost:3012/api',
    headers: {
        Authorization:`Bearer ` + getTokenFromLocalStorage() || ''
    }
})