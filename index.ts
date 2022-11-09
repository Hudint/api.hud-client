
import { Socket } from "socket.io-client";

type apiResponse = {
    error: boolean,
    result?: any,
    msg?: string
}

interface responseWithTriggerOption extends apiResponse {
    triggerError: () => void
}

type errCallback = () => void;

export default class ApiClient {
    private socket: Socket
    private apiKeyword: string
    private autoErrorCallback?: (msg?: string) => void

    constructor(socket: Socket, apiKeyword: string = "api") {
        this.socket = socket;
        this.apiKeyword = apiKeyword;
    }

    tryTriggerAutoCallback(msg?: string) {
        if (this.autoErrorCallback != undefined) {
            this.autoErrorCallback(msg);
        }
    }

    setAutoErrorCallback(callback: (msg?: string) => void): ApiClient {
        this.autoErrorCallback = callback;
        return this;
    }

    emitR(callName: string, args: Object, callback: (result: any) => void, errCallback?: errCallback) {
        this.emit(callName, args, ({ error, result, msg }) => {
            if (!error)
                callback(result);
            else {
                this.tryTriggerAutoCallback(msg);
                if (errCallback instanceof Function)
                    errCallback();
            }
        })
    }

    emit(callName: string, args: Object, callback?: (response: responseWithTriggerOption) => void) {
        ApiClient.emit(this.socket, callName, args, (response: apiResponse) => {
            if (callback)
                callback({ ...response, triggerError: () => this.tryTriggerAutoCallback(response.msg) });
        }, this.apiKeyword);
    }

    public static emit(socket: Socket, callName: string, args: Object, callback?: (response: apiResponse) => void, apiKeyword: string = "api") {
        socket.emit(apiKeyword, callName, args, callback);
    }
}