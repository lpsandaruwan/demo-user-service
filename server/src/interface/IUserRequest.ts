import {IUser, IUserBasic} from "./IUser";

export interface IUserCreateRequest {
    body: IUser
}

export interface IUserUpdateRequest {
    query: {
        id: string
    }
    body: IUserBasic
}

export interface IUserQueryRequest {
    query: {
        id: string
    }
}
