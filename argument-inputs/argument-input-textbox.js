"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var argument_input_1 = require('./argument-input');
var ArgumentInputTextbox = (function (_super) {
    __extends(ArgumentInputTextbox, _super);
    function ArgumentInputTextbox(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'textbox';
        this.type = options['type'] || '';
    }
    return ArgumentInputTextbox;
}(argument_input_1.ArgumentInput));
exports.ArgumentInputTextbox = ArgumentInputTextbox;
