import {Argument, ArgumentOptions} from './argument';

export class ArgumentTextbox extends Argument<string>{
    controlType = 'textbox';
    type:string;

    constructor(options:ArgumentOptions = {}){
        super(options);
        this.type = options['type'] || '';
    }
}
