import { Socket } from "socket.io-client";
declare type apiResponse = {
    error: boolean;
    result?: any;
    msg?: string;
};
declare type errCallback = () => void;
export default class ApiClient {
    private socket;
    private apiKeyword;
    private autoErrorCallback?;
    constructor(socket: Socket, apiKeyword?: string);
    setAutoErrorCallback(callback: (msg?: string) => void): ApiClient;
    emitR(callName: string, args: Object, callback: (result: any) => void, errCallback?: errCallback): void;
    emit(callName: string, args: Object, callback?: (response: apiResponse) => void): void;
    static emit(socket: Socket, callName: string, args: Object, callback?: (response: apiResponse) => void, apiKeyword?: string): void;
}
export {};
