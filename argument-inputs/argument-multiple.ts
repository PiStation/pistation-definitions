import {Argument} from './argument';

export class ArgumentMultiple extends Argument<string>{
    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];
    selected;

    constructor(options:{options: {key : string, value: string}[],
        key?:string,
        label?:string,
        required?:boolean,
        order?:number,
        controlType?:string}){
        super(options);
        this.options = options.options;
    }
}
