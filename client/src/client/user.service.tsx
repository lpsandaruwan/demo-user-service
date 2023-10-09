import axios from "axios";
import { USER_SERVICE_URI } from "../config";
import { IResponse } from "../interfaces/IResponse";

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
