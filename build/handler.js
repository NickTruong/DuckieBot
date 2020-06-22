"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
var Handler = /** @class */ (function () {
    function Handler() {
    }
    Handler.prototype.parseCode = function (str, command) {
        return str.substring(str.indexOf(command) + command.length);
    };
    Handler.prototype.run = function (msg) {
        var code = this.parseCode(msg.content, "run");
        msg.reply(code);
    };
    return Handler;
}());
exports.Handler = Handler;
