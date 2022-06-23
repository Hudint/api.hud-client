"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiClient = /** @class */ (function () {
    function ApiClient(socket, apiKeyword) {
        if (apiKeyword === void 0) { apiKeyword = "api"; }
        this.socket = socket;
        this.apiKeyword = apiKeyword;
    }
    ApiClient.prototype.emit = function (callName, args, callback) {
        this.socket.emit(this.apiKeyword, callName, args, callback);
    };
    return ApiClient;
}());
exports.default = ApiClient;
