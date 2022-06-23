import { Socket } from "socket.io-client";
declare type apiResponse = {
    error: boolean;
    result?: any;
};
export default class ApiClient {
    private socket;
    private apiKeyword;
    private autoErrorCallback?;
    constructor(socket: Socket, apiKeyword?: string);
    setAutoErrorCallback(callback: () => void): void;
    emitR(callName: string, args: Object, callback: (result: any) => void): void;
    emit(callName: string, args: Object, callback: (response: apiResponse) => void): void;
    static emit(socket: Socket, callName: string, args: Object, callback: (response: apiResponse) => void, apiKeyword?: string): void;
}
export {};
