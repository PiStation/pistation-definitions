import {Argument, ArgumentOptions} from './argument';

export class ArgumentBoolean extends Argument<string>{
    controlType = 'checkbox';
    type:string;

    constructor(options:ArgumentOptions = {}){
        super(options);
        this.type = options['type'] || '';
    }
}