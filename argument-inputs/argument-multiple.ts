import {Argument} from './argument';

export class ArgumentMultiple extends Argument<string>{
    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];
    selected;

    constructor(options:{} = {}){
        super(options);
    }
}
