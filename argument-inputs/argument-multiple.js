var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var argument_1 = require('./argument');
var ArgumentMultiple = (function (_super) {
    __extends(ArgumentMultiple, _super);
    function ArgumentMultiple(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'dropdown';
        this.options = [];
    }
    return ArgumentMultiple;
})(argument_1.Argument);
exports.ArgumentMultiple = ArgumentMultiple;
