export {ArgumentInputBoolean} from './argument-input-boolean';
export {ArgumentInputTextbox} from './argument-input-textbox';

export class Argument<T> {
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
