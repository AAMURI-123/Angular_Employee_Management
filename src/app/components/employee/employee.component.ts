import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { AddEmployeeService } from 'src/app/services/add-employee.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees : Employee[] = [];

  thePageNumber : number =1;
  thePageSize : number = 5;
  theTotalElements : number=0;

  constructor(private employeeService : EmployeeService,
              private router : Router,
              private addEmployeeService : AddEmployeeService
          ){}
  
  ngOnInit(): void {
  
   this.getEmployees();
  
  }

  getEmployees(){

    console.log(`the page number = ${this.thePageNumber} \n the page size = ${this.thePageSize}`);

    this.employees = [];
    this.employeeService.getEmployee(this.thePageNumber - 1,this.thePageSize).subscribe(
      data =>{
     
        for(let temp of data._embedded.employees){
          if(temp._links.departmentId.href != null){
          this.employeeService.getDepartment(temp._links.departmentId.href).subscribe(
            data=>{temp.departmentName = data.name}
          );
        }
        this.employees.push(temp);
        }

        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
        
        }
    );
 
 

  }

  edit(employee : Employee){

    this.addEmployeeService.setEmployeeFromDB(employee);

    this.router.navigateByUrl('/employee/edit')

  }


  deleteEmployee(employeeId : number, firstName : string, lastName : string){

    if(confirm(`Do you want to delete ${firstName} ${lastName} ?`)){

      // console.log(employeeId, firstName);
      this.employeeService.deleteEmployeeById(employeeId).subscribe({
        next : response =>{
                alert(`Employee ${firstName} ${lastName} has been deleted successfully.`)
        },
        error : err => {
          alert(err.message);
        }
      })
    }
    
  }


}
