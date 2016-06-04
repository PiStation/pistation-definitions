"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var argument_1 = require('./argument');
var ArgumentBoolean = (function (_super) {
    __extends(ArgumentBoolean, _super);
    function ArgumentBoolean(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'checkbox';
        this.type = options['type'] || '';
    }
    return ArgumentBoolean;
}(argument_1.Argument));
exports.ArgumentBoolean = ArgumentBoolean;
