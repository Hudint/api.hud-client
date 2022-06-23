
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
        this.socket.emit(this.apiKeyword, callName, args, callback);
    }
}