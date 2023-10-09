export interface IUserBasic {
    first_name?: string;
    last_name?: string;
}

export interface IUser extends IUserBasic {
    username: string;
}
