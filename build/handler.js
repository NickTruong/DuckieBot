"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
// http://api.paiza.io:80/runners/create?source_code=test&language=c&input=inputtest&longpoll=false&longpoll_timeout=100&api_key=guest
var base_url = "http://api.paiza.io:80";
var Handler = /** @class */ (function () {
    function Handler() {
        this.requests = new Map();
        this.request_limit = 5;
        this.delay = 3000;
    }
    Handler.prototype.parseCode = function (str, language) {
        return str.substring(str.indexOf(language) + language.length + 1);
    };
    Handler.prototype.run = function (message, language) {
        return __awaiter(this, void 0, void 0, function () {
            var code, request, id, response, _loop_1, this_1, state_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = this.parseCode(message.content, language);
                        request = {
                            source_code: code,
                            language: language
                        };
                        id = "";
                        return [4 /*yield*/, this.createRunner(request, message)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            return [2 /*return*/];
                        return [4 /*yield*/, response.json().then(function (json) {
                                id = json.id;
                                _this.requests.set(json.id, message);
                            })];
                    case 2:
                        _a.sent();
                        _loop_1 = function () {
                            var status_1, response_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        status_1 = "";
                                        return [4 /*yield*/, this_1.getStatus(id)];
                                    case 1:
                                        response_1 = _a.sent();
                                        if (!response_1.ok)
                                            return [2 /*return*/, { value: void 0 }];
                                        return [4 /*yield*/, response_1.json().then(function (json) {
                                                status_1 = json.status;
                                            })];
                                    case 2:
                                        _a.sent();
                                        if (status_1 === "completed")
                                            return [2 /*return*/, "break"];
                                        setTimeout(function () { }, 3000);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 3;
                    case 3:
                        if (!this.requests.has(id)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1()];
                    case 4:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        if (state_1 === "break")
                            return [3 /*break*/, 5];
                        return [3 /*break*/, 3];
                    case 5: return [4 /*yield*/, this.getDetails(id)];
                    case 6:
                        response = _a.sent();
                        return [4 /*yield*/, response.json().then(function (json) {
                                _this.requests.delete(id);
                                console.log(json);
                                (json.build_stdout) ? message.channel.send(json.build_stdout) : null;
                                (json.build_stderr) ? message.channel.send(json.build_stderr) : null;
                                (json.stdout) ? message.channel.send(json.stdout) : null;
                                (json.stderr) ? message.channel.send(json.stderr) : null;
                            })];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // base_url + "/runners/create?" + 
    // "source_code=" + request.source_code + 
    // "&language=" + request.language + 
    // ((request.input != null)? "&input=" + request.input : "") + 
    // ((request.longpoll != null)? "&longpoll=" + request.longpoll : "") +
    // ((request.longpoll_timeout != null)? "&longpoll_timeout=" + request.longpoll_timeout : "") +
    // "&api_key=guest"
    Handler.prototype.createRunner = function (request, message) {
        var myURL = new URL(base_url + "/runners/create");
        myURL.searchParams.set("source_code", request.source_code);
        myURL.searchParams.set("language", request.language);
        myURL.searchParams.set("api_key", "guest");
        (request.input !== null) ? myURL.searchParams.set("input", request.input) : null;
        (request.longpoll !== null) ? myURL.searchParams.set("longpoll", request.longpoll) : null;
        (request.longpoll_timeout !== null) ? myURL.searchParams.set("longpoll_timeout", request.longpoll_timeout) : null;
        return node_fetch_1.default(myURL, {
            method: "POST"
        });
    };
    Handler.prototype.getStatus = function (id) {
        return node_fetch_1.default(base_url + "/runners/get_status?" +
            "id=" + id +
            "&api_key=guest", {
            method: "GET"
        });
    };
    Handler.prototype.getDetails = function (id) {
        return node_fetch_1.default(base_url + "/runners/get_details?" +
            "id=" + id +
            "&api_key=guest", {
            method: "GET"
        });
    };
    return Handler;
}());
exports.Handler = Handler;
