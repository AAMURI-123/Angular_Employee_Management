import { Component, OnInit } from '@angular/core';
import { AddEmployeeService } from 'src/app/services/add-employee.service';

@Component({
  selector: 'app-saved-employee',
  templateUrl: './saved-employee.component.html',
  styleUrls: ['./saved-employee.component.css']
})
export class SavedEmployeeComponent implements OnInit {

  firstName : string;
  lastName : string;
  idNo : string;

  constructor(private addEmployeeService : AddEmployeeService){}


  ngOnInit(): void {
  
    const employeeInfo : string = this.addEmployeeService.getRegisteredEmployeeInfo();
this.idNo = employeeInfo;
    console.log(this.idNo);
    // this.firstName = employeeInfo[0];
    // this.lastName = employeeInfo[1];
    // this.idNo = employeeInfo[2]; 

  }


}
