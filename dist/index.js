"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiClient = /** @class */ (function () {
    function ApiClient(socket, apiKeyword) {
        if (apiKeyword === void 0) { apiKeyword = "api"; }
        this.socket = socket;
        this.apiKeyword = apiKeyword;
    }
    ApiClient.prototype.setAutoErrorCallback = function (callback) {
        this.autoErrorCallback = callback;
        return this;
    };
    ApiClient.prototype.emitR = function (callName, args, callback) {
        var _this = this;
        this.emit(callName, args, function (_a) {
            var error = _a.error, result = _a.result;
            if (!error)
                callback(result);
            else if (_this.autoErrorCallback != undefined)
                _this.autoErrorCallback();
        });
    };
    ApiClient.prototype.emit = function (callName, args, callback) {
        ApiClient.emit(this.socket, callName, args, callback, this.apiKeyword);
    };
    ApiClient.emit = function (socket, callName, args, callback, apiKeyword) {
        if (apiKeyword === void 0) { apiKeyword = "api"; }
        socket.emit(apiKeyword, callName, args, callback);
    };
    return ApiClient;
}());
exports.default = ApiClient;
