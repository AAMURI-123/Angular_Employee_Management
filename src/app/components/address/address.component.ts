import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/Classes/Address';
import { Employee } from 'src/app/Classes/Employee';
import { AddEmployeeService } from 'src/app/services/add-employee.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit{
 
  address : Address = new Address();
  employee: Employee = new Employee();
  
  constructor(private employeeService : EmployeeService, private route : Router,
    private addEmployeeService : AddEmployeeService,
              private router : ActivatedRoute){}

  ngOnInit(): void {
    
    let hasEmployeeId = this.router.snapshot.paramMap.has("id");

    if(hasEmployeeId){
     let employeeId = +this.router.snapshot.paramMap.get("id");
      this.employeeService.getEmployeeAddress(employeeId).subscribe(data =>{
        this.address = data;
       
      });

      this.employeeService.getEmployeeById(employeeId).subscribe(data =>{
        this.employee = data;
      });
    }
  }


  editAddress(address : Address){

    this.addEmployeeService.setAddressFromDB(address);
    this.route.navigateByUrl(`/address/${address.id}/edit`);
  }
}
