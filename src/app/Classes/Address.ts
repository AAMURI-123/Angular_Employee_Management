import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Address{

    id : number;
    street : String;
    city : String;
    state : String;
    zipCode : number;
}