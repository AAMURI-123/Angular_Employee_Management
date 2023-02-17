import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddEmployee } from '../Classes/AddEmployee';
import { Address } from '../Classes/Address';
import { EditEmployee } from '../Classes/EditEmployee';
import { Employee } from '../Classes/Employee';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeService {
  

 address : Address;
  employee : Employee;
  idNo : string = '';

  constructor(private httpCLient : HttpClient) { }

  addEmployee(employee : AddEmployee) : Observable<any>{

    const addEmployeeUrl = `http://localhost:8080/employee/register`;

    return this.httpCLient.post<AddEmployee>(addEmployeeUrl,employee);
  }

  setRegisteredEmployeeInfo(
                          idNo : string) {

    // this.firstName = firstName;
    // this.lastName = lastName;
    this.idNo = idNo;
  } 

  getRegisteredEmployeeInfo() : string{

    let idNos = this.idNo;
    // let employeeInfo : string[] = [this.firstName,this.lastName, this.idNo];

    return idNos;
  }

  setEmployeeFromDB(employee: Employee) {
   
this.employee = employee;
  }

  getEmployeeFromDB() : Employee{

    return this.employee;
  }

  updateEmployee(editEmployee : EditEmployee) {

    const putURL = `http://localhost:8080/employee/edit`;

    return this.httpCLient.put<EditEmployee>(putURL,editEmployee);

  }

  updateAddress(addressObject: Address) {
   
    const putAddressURL = `http://localhost:8080/address/edit`;

    return this.httpCLient.put<Address>(putAddressURL,addressObject);
  }

  setAddressFromDB(address: Address) {
    
  this.address = address;
  }

  getAddressFromDB(){
    return this.address;
  }
}
