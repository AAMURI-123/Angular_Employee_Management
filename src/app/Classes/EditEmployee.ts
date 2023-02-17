import { Injectable } from "@angular/core";
import { Department } from "./Department";
import { Employee } from "./Employee";

@Injectable({
    providedIn:'root'
})
export class EditEmployee{

    employee : Employee;
    department : Department;
}