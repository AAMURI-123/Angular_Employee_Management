import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Address } from '../Classes/Address';
import { Department } from '../Classes/Department';
import { Employee } from '../Classes/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private httpClient  : HttpClient) { }
  
  getEmployee(thePageNumber : number, thePageSize : number) : Observable<GetEmployees>{
    
    const searchUrl = `http://localhost:8080/employees?page=${thePageNumber}&size=${thePageSize}`;
    
    return this.httpClient.get<GetEmployees>(searchUrl);
  }

  getEmployeeById(id : number)  : Observable<Employee>{

    const searchUrl = `http://localhost:8080/employees/${id}`;

    return this.httpClient.get<Employee>(searchUrl); 
  }

  getEmployeeBySearch(keyword : string) : Observable<Employee[]>{

    const searchUrl = `http://localhost:8080/employees/search/findByFirstName?firstName=${keyword}`;

 return this.httpClient.get<GetEmployees>(searchUrl).pipe(map(
   response => response._embedded.employees));
  }

  getDepartment(departmentUrl: string) : Observable<Department>{
   
  return this.httpClient.get<Department>(departmentUrl);
  }

  getEmployeeAddress(employeeId : number) : Observable<Address>{

    const searchUrl = `http://localhost:8080/address/${employeeId}`;
    return this.httpClient.get<Address>(searchUrl);
  }

  deleteEmployeeById(employeeId : number) : Observable<any> {

    const searchUrl = `http://localhost:8080/employees/${employeeId}`;

    return this.httpClient.delete(searchUrl); 
  }

  getDepartments() : Observable<Department[]>{

    const searchUrl = `http://localhost:8080/departments`;

    return this.httpClient.get<GetDepartments>(searchUrl).pipe(map(
      response => response._embedded.departments
    ));
  }
}

interface GetEmployees{
  _embedded:{
    employees : Employee[];
  },
  page :{
size : number;
totalElements : number;
totalPages : number;
number : number;
  }
}

interface GetDepartments{
  _embedded:{
    departments : Department[];
  }
}