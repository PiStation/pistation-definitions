"use strict";
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
