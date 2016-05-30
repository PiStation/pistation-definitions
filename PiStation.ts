import * as Rx from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject'
import Subscription = Rx.Subscription;
import * as io from "socket.io";
import Socket = SocketIO.Socket;

export interface ServerEvent {
    socket: SocketIO.Socket;
    data: any;
}

export class Server {
    private socketServer:SocketIO.Server;
    private modules:Module[] = [];
    private listeners:string[];

    public clientConnections:Rx.Observable<SocketIO.Socket>;

    constructor(private port:number = 31415) {
        this.socketServer = io(port);
        console.log('Server Started');

        this.clientConnections = Rx.Observable.create((observer : any) => {
            this.socketServer.on(`${Events.CLIENT_CONNECTED}`,(socket : SocketIO.Socket) => observer.next(socket))

            this.socketServer.on('error', (error : any) => {
                console.log('ERROR', error);
                observer.error(error)
            });
        });

        this.clientConnections
            .forEach((socket : SocketIO.Socket) => console.log(`New client connection | ID: ${socket.client.id} IP address: ${socket.client.conn.remoteAddress}`));
        this.clientConnections
            .forEach((socket : SocketIO.Socket) => this.registerEventsForClient(socket));

        this.on(`${Events.GET_ALL_MODULES}`).subscribe( (event : ServerEvent) => {
            let json = this.modules.map(module => module.toDto());
            console.log('Returning modules:',  json);
            event.socket.emit(`${Events.GET_ALL_MODULES}`, json);
        });

    }

    addModule(module:Module) {
        return this.modules.push(module);
    }

    on(event:string):Rx.Observable<ServerEvent> {
        return this.clientConnections
            .flatMap((socket : SocketIO.Socket) =>
                Rx.Observable.fromEvent(socket, event)
                    .map((data: any) => <ServerEvent>{data: data, socket: socket}));
    }

    private registerEventsForClient(socket:SocketIO.Socket){
        this.modules
            .forEach((module : Module) => { module.registerFunctionCallsForClient(socket)});
    }
}


export interface AbstractModule {
    name: string;
    functions: Function[]
    register?(app : Server) : Server;
}
export class Module implements AbstractModule {
    functionCallStream : Rx.Observable<Function>;
    name: string;
    functions: Function[] = [];

    constructor(name: string, functionArray: Function[] = []) {

        this.name = name;
        functionArray.forEach(func => this.addFunction(new Function(func.name, func.arguments)));
    }

    registerFunctionCallsForClient(clientSocket : SocketIO.Socket){
        this.functions.forEach((func:Function) =>
            Rx.Observable
                .fromEvent(clientSocket, `${func.eventName}`)
                .map((json : any) => new Function(func.name, json))
                .forEach((func : any) => console.log('function called ', func)));

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