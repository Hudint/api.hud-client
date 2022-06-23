import { Socket } from "socket.io-client";
declare type apiResponse = {
    error: boolean;
    result?: any;
};
export default class ApiClient {
    private socket;
    private apiKeyword;
    constructor(socket: Socket, apiKeyword?: string);
    emit(callName: string, args: Object, callback: (response: apiResponse) => any): void;
    static emit(socket: Socket, callName: string, args: Object, callback: (response: apiResponse) => any, apiKeyword?: string): void;
}
export {};
