import { Injectable } from "@angular/core";
import { Address } from "./Address";
import { Department } from "./Department";
import { Employee } from "./Employee";

@Injectable({
    providedIn:'root'
})
export class AddEmployee {

    employee : Employee;
    address : Address;
    department : Department;
}