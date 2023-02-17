import { FormControl, ValidationErrors } from "@angular/forms";

export class CheckValidation{

   public static onlyWhiteSpaceValidation(control : FormControl) : ValidationErrors{

       
            if(control != null && (control.value.trim() == 0)){
                return {'onlyWhiteSpaceValidation' : true};
            }
            else{
                return null;
            }
        

    }
}