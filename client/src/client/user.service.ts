import axios from "axios";
import {USER_SERVICE_URI} from "../config";
import {IResponse} from "../interfaces/IResponse";
import {IUser, IUserBasic} from "../interfaces/IUser";

export async function fetchUsers(): Promise<IResponse | undefined> {
    try {
        const result = await axios.get(USER_SERVICE_URI);
        if (result) {
            return result.data;
        }
    } catch (err) {
        alert('Error occurred while fetching users!');
    }
}

export async function addUser(user: IUser): Promise<IResponse | undefined> {
    try {
        const result = await axios.post(USER_SERVICE_URI, user);
        if (result) {
            return result.data;
        }
    } catch (err) {
        alert('Error occurred while creating user!');
    }
}

export async function editUser(username: string, user: IUserBasic): Promise<IResponse | undefined> {
    try {
        const result = await axios.put(`${USER_SERVICE_URI}/${username}`, user);
        if (result) {
            return result.data;
        }
    } catch (err) {
        alert('Error occurred while editing user!');
    }
}

export async function deleteUser(username: string): Promise<IResponse | undefined> {
    try {
        const result = await axios.delete(`${USER_SERVICE_URI}/${username}`);
        if (result) {
            return result.data;
        }
    } catch (err) {
        alert('Error occurred while deleting users!');
    }
}
