"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApiClient = /** @class */ (function () {
    function ApiClient(socket, apiKeyword) {
        if (apiKeyword === void 0) { apiKeyword = "api"; }
        this.socket = socket;
        this.apiKeyword = apiKeyword;
    }
    ApiClient.prototype.tryTriggerAutoCallback = function (msg) {
        if (this.autoErrorCallback != undefined) {
            this.autoErrorCallback(msg);
        }
    };
    ApiClient.prototype.setAutoErrorCallback = function (callback) {
        this.autoErrorCallback = callback;
        return this;
    };
    ApiClient.prototype.emitR = function (callName, args, callback, errCallback) {
        var _this = this;
        this.emit(callName, args, function (_a) {
            var error = _a.error, result = _a.result, msg = _a.msg;
            if (!error)
                callback(result);
            else {
                _this.tryTriggerAutoCallback(msg);
                if (errCallback instanceof Function)
                    errCallback();
            }
        });
    };
    ApiClient.prototype.emit = function (callName, args, callback) {
        var _this = this;
        ApiClient.emit(this.socket, callName, args, function (response) {
            if (callback)
                callback(__assign(__assign({}, response), { triggerError: function () { return _this.tryTriggerAutoCallback(response.msg); } }));
        }, this.apiKeyword);
    };
    ApiClient.emit = function (socket, callName, args, callback, apiKeyword) {
        if (apiKeyword === void 0) { apiKeyword = "api"; }
        socket.emit(apiKeyword, callName, args, callback);
    };
    return ApiClient;
}());
exports.default = ApiClient;
