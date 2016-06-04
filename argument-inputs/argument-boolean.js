var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var argument_input_1 = require('./argument-input');
var ArgumentInputBoolean = (function (_super) {
    __extends(ArgumentInputBoolean, _super);
    function ArgumentInputBoolean(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'checkbox';
        this.type = options['type'] || '';
    }
    return ArgumentInputBoolean;
})(argument_input_1.ArgumentInput);
exports.ArgumentInputBoolean = ArgumentInputBoolean;
