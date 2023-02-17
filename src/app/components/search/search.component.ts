import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { AddEmployeeService } from 'src/app/services/add-employee.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  employees : Employee[] = [];

  constructor(private employeeService : EmployeeService, private addEmployeeService : AddEmployeeService,private urlRoute : Router, 
          private router : ActivatedRoute){}

  ngOnInit(): void {
    console.log("keyword");

    this.router.paramMap.subscribe (()=> {
      this.getEmployeeBySearch();
    });
  
}
  getEmployeeBySearch() {
 
    const hasKeyword = this.router.snapshot.paramMap.has("keyword");
  if(hasKeyword){
    const keyword = this.router.snapshot.paramMap.get("keyword");
    console.log(keyword);
  this.employeeService.getEmployeeBySearch(keyword).subscribe(data =>{
     //console.log(data);
     this.employees =[];
     for(let temp of data){
      if(temp._links.departmentId.href != null){
      this.employeeService.getDepartment(temp._links.departmentId.href).subscribe(
        data=>{temp.departmentName = data.name}
      );
    }
    
    this.employees.push(temp);
    }
    })
} 
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

  editEmployee(employee : Employee){

    this.addEmployeeService.setEmployeeFromDB(employee);

    this.urlRoute.navigateByUrl('/employee/edit');

  }

}
