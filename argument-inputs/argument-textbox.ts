import {Argument} from './argument';

export class ArgumentInputTextbox extends Argument<string>{
    controlType = 'textbox';
    type:string;

    constructor(options:{} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}
