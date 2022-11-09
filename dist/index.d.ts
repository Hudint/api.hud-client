import { Socket } from "socket.io-client";
declare type apiResponse = {
    error: boolean;
    result?: any;
    msg?: string;
};
interface responseWithTriggerOption extends apiResponse {
    triggerError: () => void;
}
declare type errCallback = () => void;
export default class ApiClient {
    private socket;
    private apiKeyword;
    private autoErrorCallback?;
    constructor(socket: Socket, apiKeyword?: string);
    tryTriggerAutoCallback(msg?: string): void;
    setAutoErrorCallback(callback: (msg?: string) => void): ApiClient;
    emitR(callName: string, args: Object, callback: (result: any) => void, errCallback?: errCallback): void;
    emit(callName: string, args: Object, callback?: (response: responseWithTriggerOption) => void): void;
    static emit(socket: Socket, callName: string, args: Object, callback?: (response: apiResponse) => void, apiKeyword?: string): void;
}
export {};
