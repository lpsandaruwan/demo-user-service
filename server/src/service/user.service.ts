import {IUser, IUserBasic} from "../interface/IUser";
import {User} from "../model/User";
import {IResponse} from "../interface/IResponse";
import {ResponseCode} from "../interface/ResponseCode";


async function findUserByUsername(username: string) {
    return await User.findOne({ where: { username: username }});
}

export async function getUser(username: string): Promise<IResponse> {
    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return {
                code: ResponseCode.BAD_REQUEST,
                result: `User ${username} doesn't exist!`
            }
        }
        return {
            code: ResponseCode.SUCCESSFUL,
            result: user
        }
    } catch (err) {
        return {
            code: ResponseCode.ERROR,
            result: `Error occurred while fetching user ${username}`
        }
    }
}

export async function createUser(userData: IUser): Promise<IResponse> {
    try {
        let user = await findUserByUsername(userData.username);
        if (user) {
            return {
                code: ResponseCode.BAD_REQUEST,
                result: `User ${userData.username} already exists!`
            }
        }
        user = await User.create({
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name
        });
        return {
            code: ResponseCode.SUCCESSFUL,
            result: user
        }
    } catch (err) {
        return {
            code: ResponseCode.ERROR,
            result: "Error occurred while creating a new user"
        }
    }
}

export async function deleteUser(username: string): Promise<IResponse> {
    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return {
                code: ResponseCode.BAD_REQUEST,
                result: `User ${username} doesn't exists!`
            }
        }
        await user.destroy();
        return {
            code: ResponseCode.SUCCESSFUL,
            result: `User ${username} has been deleted successfully!`
        }
    } catch (err) {
        return {
            code: ResponseCode.ERROR,
            result: `Error occurred while deleting user ${username}`
        }
    }
}

export async function updateUser(username: string, newUserData: IUserBasic): Promise<IResponse> {
    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return {
                code: ResponseCode.BAD_REQUEST,
                result: `User ${username} doesn't exists!`
            }
        }
        await user.update(newUserData);
        const result = await user.save();
        return {
            code: ResponseCode.SUCCESSFUL,
            result: user
        }
    } catch (err) {
        return {
            code: ResponseCode.ERROR,
            result: `Error occurred while updating user ${username}`
        }
    }
}
