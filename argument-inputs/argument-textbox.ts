import {Argument} from './argument';

export class ArgumentTextbox extends Argument<string>{
    controlType = 'textbox';
    type:string = 'text';

    constructor(options:{} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}
