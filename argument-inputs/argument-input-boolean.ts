import {ArgumentInput} from './argument-input';

export class ArgumentInputBoolean extends ArgumentInput<string>{
    controlType = 'checkbox';
    type:string;

    constructor(options:{} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}