"use strict";
var argument_boolean_1 = require('./argument-boolean');
exports.ArgumentBoolean = argument_boolean_1.ArgumentBoolean;
var argument_textbox_1 = require('./argument-textbox');
exports.ArgumentTextbox = argument_textbox_1.ArgumentTextbox;
var Argument = (function () {
    function Argument(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.controlType = options.controlType || '';
    }
    return Argument;
}());
exports.Argument = Argument;
