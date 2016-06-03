
export interface AbstractModule {
    name: string;
    functions: Function[]
    register?();
}

export interface AbstractConnector {
    name: string;
    register?();
}

export class Module implements AbstractModule {
    name: string;
    functions: Function[] = [];

    constructor(name: string, functionArray: Function[] = []) {
        this.name = name;
        functionArray.forEach(func => this.addFunction(new Function(func.name, func.arguments)));
    }

    toString() : string {
        return this.name;
    }

    addFunction(func: Function) {
        func.moduleName = this.name;
        this.functions.push(func);
    }

    toDto():any {
        return {
            name: this.name,
            functions: this.functions.map(func => func.toDto()),
        }
    }
}

/**
 * General connector class so that the connector is able to access the API logic (soon to come?)
 */
export class Connector implements AbstractConnector {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    toString() : string {
        return this.name;
    }
}

export class Function {
    arguments: Argument[];
    name: string;

    constructor(name: string, argumentArray: Argument[] = [], public moduleName?) {
        this.name = name;
        this.arguments = argumentArray;
    }

    toDto(){
        return {
            name: this.name,
            arguments: this.arguments
        }
    }

    addArguments(arg: Argument) {
        this.arguments.push(arg);
    }

    toString() : string {
        return this.name;
    }
    get eventName() {
        return `${this.moduleName || 'AnonymousFunction'}:${this.name}`;
    }
}

export class Argument {
    type: string;
    name: string;

    constructor(type: string, name:string, public value = '') {
        this.type = type;
        this.name = name;
    }
}
export class ArgumentInput<T> {
    value:T;
    key:string;
    label:string;
    required:boolean;
    controlType:string;
    constructor(options:{
        value?:T,
        key?:string,
        label?:string,
        required?:boolean,
        order?:number,
        controlType?:string
    } = {}){
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.controlType = options.controlType || '';
    }
}

export class ArgumentInputTextbox extends ArgumentInput<string>{
    controlType = 'textbox';
    type:string;

    constructor(options:{} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}
export class ArgumentInputBoolean extends ArgumentInput<string>{
    controlType = 'checkbox';
    type:string;

    constructor(options:{} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}

export class ServerEvent {
    name: string;
    constructor(name : string) {
        this.name = name;
    }
    toString(){
        return this.name;
    }
}

export class SystemEvent extends ServerEvent {
    constructor(name : string){
        super(name);
    }
}

export class ModuleEvent extends ServerEvent {
    constructor(private moduleName : Module | string,
                private functionName : string){
        super(`${moduleName}:${functionName}`);
    }

    static fromEventName(eventName : string) : ModuleEvent{
        let [moduleName,functionName] = name.split(':') || [name, 'start'];
        return new ModuleEvent(moduleName, functionName);
    }

    getModuleName():string{
        return `${this.moduleName}`;
    }
    getFunctionName():string {
        return this.functionName;
    }
}

export class Events {
    static CLIENT_CONNECTED = new ServerEvent('connection');
    static CLIENT_DISCONNECTED = new ServerEvent('disconnect');
    static GET_ALL_MODULES = new SystemEvent('getAllModules');
    static GET_ALL_ACTIONS = new SystemEvent('getAllActions');
}

export class Action {
    name: string;
    cols: number;
    rows: number;
    color: string;
    func: Function;
    arguments: Argument[];
}