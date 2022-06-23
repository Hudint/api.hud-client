
import { Socket } from "socket.io-client";

type apiResponse = {
    error: boolean,
    result?: any
}

export default class ApiClient {
    private socket: Socket
    private apiKeyword: string
    private autoErrorCallback?: () => void

    constructor(socket: Socket, apiKeyword: string = "api") {
        this.socket = socket;
        this.apiKeyword = apiKeyword;
    }

    setAutoErrorCallback(callback: () => void): ApiClient {
        this.autoErrorCallback = callback;
        return this;
    }

    emitR(callName: string, args: Object, callback: (result: any) => void) {
        this.emit(callName, args, ({ error, result }) => {
            if (!error)
                callback(result);
            else if (this.autoErrorCallback != undefined)
                this.autoErrorCallback();
        })
    }

    emit(callName: string, args: Object, callback?: (response: apiResponse) => void) {
        ApiClient.emit(this.socket, callName, args, callback, this.apiKeyword);
    }

    public static emit(socket: Socket, callName: string, args: Object, callback?: (response: apiResponse) => void, apiKeyword: string = "api") {
        socket.emit(apiKeyword, callName, args, callback);
    }
}