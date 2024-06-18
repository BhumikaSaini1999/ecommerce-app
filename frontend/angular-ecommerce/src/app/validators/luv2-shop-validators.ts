import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

    //whitespace validation
    //if validation check fails then returning validation errors and if passes returning null
    static notOnlyWhitespace(control: FormControl) : ValidationErrors | null{
        //check if string only contains whitespace
        if((control.value!=null) && (control.value.trim().length === 0)){
            //invalid, return error object
            //notOnlyWhitespace is error key
            return { 'notOnlyWhitespace': true };
        }else{
            //valid, return null
            return null;
        }
    }
}
