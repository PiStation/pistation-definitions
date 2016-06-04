import {Argument} from './argument';

export class ArgumentBoolean extends Argument<string>{
    controlType = 'checkbox';
    type:string;

    constructor(options:{} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}