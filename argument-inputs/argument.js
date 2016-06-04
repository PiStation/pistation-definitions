var argument_input_boolean_1 = require('./argument-input-boolean');
exports.ArgumentInputBoolean = argument_input_boolean_1.ArgumentInputBoolean;
var argument_input_textbox_1 = require('./argument-input-textbox');
exports.ArgumentInputTextbox = argument_input_textbox_1.ArgumentInputTextbox;
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
})();
exports.Argument = Argument;
