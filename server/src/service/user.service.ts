import { IUser, IUserBasic } from "../interface/IUser";
import { User } from "../model/User";


export async function getUser(username: string) {
    return await User.findOne({ where: { username: username } });
}

export async function createUser(user: IUser) {
    return await User.create({
        username: user.last_name,
        first_name: user.first_name,
        last_name: user.last_name
    });
}

export async function deleteUser(username: string) {
    const user = await getUser(username);
    if (!user) {
        console.log(`User ${username} doesn't exists!`);
        return false;
    }
    await user.destroy();
    return true;
}

export async function updateUser(username: string, newUserData: IUserBasic) {
    const user = await getUser(username);
    if (!user) {
        return null;
    }
    return await user.update(newUserData);
}
