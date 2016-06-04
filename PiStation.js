var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module = (function () {
    function Module(name, functionArray) {
        var _this = this;
        if (functionArray === void 0) { functionArray = []; }
        this.functions = [];
        this.name = name;
        functionArray.forEach(function (func) { return _this.addFunction(new Function(func.name, func.arguments)); });
    }
    Module.prototype.toString = function () {
        return this.name;
    };
    Module.prototype.addFunction = function (func) {
        func.moduleName = this.name;
        this.functions.push(func);
    };
    Module.prototype.toDto = function () {
        return {
            name: this.name,
            functions: this.functions.map(function (func) { return func.toDto(); }),
        };
    };
    return Module;
})();
exports.Module = Module;
/**
 * General connector class so that the connector is able to access the API logic (soon to come?)
 */
var Connector = (function () {
    function Connector(name) {
        this.name = name;
    }
    Connector.prototype.toString = function () {
        return this.name;
    };
    return Connector;
})();
exports.Connector = Connector;
var Function = (function () {
    function Function(name, argumentArray, moduleName) {
        if (argumentArray === void 0) { argumentArray = []; }
        this.moduleName = moduleName;
        this.name = name;
        this.arguments = argumentArray;
    }
    Function.prototype.toDto = function () {
        return {
            name: this.name,
            arguments: this.arguments
        };
    };
    Function.prototype.addArguments = function (arg) {
        this.arguments.push(arg);
    };
    Function.prototype.toString = function () {
        return this.name;
    };
    Object.defineProperty(Function.prototype, "eventName", {
        get: function () {
            return (this.moduleName || 'AnonymousFunction') + ":" + this.name;
        },
        enumerable: true,
        configurable: true
    });
    return Function;
})();
exports.Function = Function;
var ServerEvent = (function () {
    function ServerEvent(name) {
        this.name = name;
    }
    ServerEvent.prototype.toString = function () {
        return this.name;
    };
    return ServerEvent;
})();
exports.ServerEvent = ServerEvent;
var SystemEvent = (function (_super) {
    __extends(SystemEvent, _super);
    function SystemEvent(name) {
        _super.call(this, name);
    }
    return SystemEvent;
})(ServerEvent);
exports.SystemEvent = SystemEvent;
var ModuleEvent = (function (_super) {
    __extends(ModuleEvent, _super);
    function ModuleEvent(moduleName, functionName) {
        _super.call(this, moduleName + ":" + functionName);
        this.moduleName = moduleName;
        this.functionName = functionName;
    }
    ModuleEvent.fromEventName = function (eventName) {
        var _a = name.split(':') || [name, 'start'], moduleName = _a[0], functionName = _a[1];
        return new ModuleEvent(moduleName, functionName);
    };
    ModuleEvent.prototype.getModuleName = function () {
        return "" + this.moduleName;
    };
    ModuleEvent.prototype.getFunctionName = function () {
        return this.functionName;
    };
    return ModuleEvent;
})(ServerEvent);
exports.ModuleEvent = ModuleEvent;
var Events = (function () {
    function Events() {
    }
    Events.CLIENT_CONNECTED = new ServerEvent('connection');
    Events.CLIENT_DISCONNECTED = new ServerEvent('disconnect');
    Events.GET_ALL_MODULES = new SystemEvent('getAllModules');
    Events.GET_ALL_ACTIONS = new SystemEvent('getAllActions');
    return Events;
})();
exports.Events = Events;
var Action = (function () {
    function Action() {
    }
    return Action;
})();
exports.Action = Action;
