import axios from "axios";
import { USER_SERVICE_URI } from "../config";
import { IResponse } from "../interfaces/IResponse";
import { IUser } from "../interfaces/IUser";
import {json} from "stream/consumers";

export async function fetchUsers(): Promise< IResponse | undefined> {
    try {
        const result = await axios.get(USER_SERVICE_URI);
        if (result) {
            return result.data;
        }
    } catch (err) {
        alert('Error occurred while fetching users!');
    }
}

export async function addUser(user: IUser): Promise< IResponse | undefined> {
    try {
        const result = await axios.post(USER_SERVICE_URI, user);
        if (result) {
            return result.data;
        }
    } catch (err) {
        alert('Error occurred while fetching users!');
    }
}
