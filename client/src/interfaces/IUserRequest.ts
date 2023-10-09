import {IUser, IUserBasic} from "./IUser";

export interface IUserCreateRequest {
    body: IUser
}

export interface IUserUpdateRequest {
    params: {
        username: string
    }
    body: IUserBasic
}

export interface IUserQueryRequest {
    params: {
        username: string
    }
}
