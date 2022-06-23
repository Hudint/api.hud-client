
import { Socket } from "socket.io-client";

type apiResponse = {
    error: boolean,
    result?: any
}

export default class ApiClient{
    private socket: Socket
    private apiKeyword: string
    
    constructor(socket: Socket, apiKeyword: string = "api"){
        this.socket = socket;
        this.apiKeyword = apiKeyword;
    }

    emit(callName: string, args: Object, callback: (response: apiResponse)=>any){
        ApiClient.emit(this.socket, callName, args, callback, this.apiKeyword);
    }

    public static emit(socket: Socket, callName: string, args: Object, callback: (response: apiResponse)=>any, apiKeyword: string = "api"){
        socket.emit(apiKeyword, callName, args, callback);
    }
}