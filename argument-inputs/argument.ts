export {ArgumentBoolean} from './argument-boolean';
export {ArgumentTextbox} from './argument-textbox';

export interface ArgumentOptions {
    value?:any;
    key?:string;
    label?:string;
    required?:boolean;
    order?:number;
    controlType?:string;
}
export class Argument<T> {
    value:T;
    key:string;
    label:string;
    required:boolean;
    controlType:string;
    constructor(options:ArgumentOptions = {}){
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.controlType = options.controlType || '';
    }
}
