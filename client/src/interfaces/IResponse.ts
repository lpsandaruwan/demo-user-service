import {ResponseCode} from "./ResponseCode";

export interface IResponse {
    code: ResponseCode;
    result: any;
}
