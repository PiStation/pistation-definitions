import * as Rx from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject'
import Subscription = Rx.Subscription;

export interface AbstractModule {
    name: string;
    functions: Function[]
    register?();
}
export class Module implements AbstractModule {
    functionCallStream : Rx.Observable<Function>;
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

export class Function {
    arguments: Argument[];
    name: string;
    moduleName : string;
    callStream : Subject<Argument[]|{}>;

    constructor(name: string, argumentArray: Argument[] = []) {
        this.name = name;
        this.arguments = argumentArray;
        this.callStream = new Subject();
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

    constructor(type: string, name:string) {
        this.type = type;
        this.name = name;
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
}

export class Action {
    text: string;
    cols: number;
    rows: number;
    color: string;
}