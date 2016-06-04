import {ArgumentInput} from './argument-input';

export class ArgumentInputTextbox extends ArgumentInput<string>{
    controlType = 'textbox';
    type:string;

    constructor(options:{} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}
