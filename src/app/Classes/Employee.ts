import { Injectable } from "@angular/core";
import { Department } from "./Department";

@Injectable({
    providedIn: 'root'
  })
export class Employee{
    id : number;
    firstName : string;
    lastName : string;
    imageUrl : string;
   email : string;
        _links : {
    departmentId : {
    href : string;
}
   };
   phoneNo : string;
   salary : number;
   experienceYears : number;
   startedDate  : Date;
   updatedDate : Date;
   identificationNumber : number; 
   departmentName : String = "";

   
}