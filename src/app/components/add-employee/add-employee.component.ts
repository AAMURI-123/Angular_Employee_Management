import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddEmployee } from 'src/app/Classes/AddEmployee';
import { Address } from 'src/app/Classes/Address';
import { CheckValidation } from 'src/app/Classes/CheckValidation';
import { Department } from 'src/app/Classes/Department';
import { Employee } from 'src/app/Classes/Employee';
import { AddEmployeeService } from 'src/app/services/add-employee.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  
  theFormGroup : FormGroup;

  departments : Department[] = [];

  constructor(private fromBuilder : FormBuilder,
              private router : Router,
              private employeeService : EmployeeService,
              private departmentObject : Department,
              private employee : Employee,
              private address : Address,
              private addEmployee : AddEmployee,
              private addEmployeeService : AddEmployeeService){
              }

  ngOnInit(): void {
  
    this.employeeService.getDepartments().subscribe(
      data=> {this.departments = data}
    )
    this.theFormGroup = this.fromBuilder.group({
      'employee' : this.fromBuilder.group({
        'firstName' : new FormControl('',[Validators.required,Validators.minLength(2),CheckValidation.onlyWhiteSpaceValidation]),
        'lastName' : new FormControl('',[Validators.required,Validators.minLength(2),CheckValidation.onlyWhiteSpaceValidation]),
        'department' : new FormControl('',[Validators.required]),
        'salary' : new FormControl('',[Validators.required,Validators.minLength(4)]),
        'experianceYears' : new FormControl('',[Validators.required]),
        'email' : new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        'phoneNo' : new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
        'imageUrl' : new FormControl('',Validators.required)
      }),

      'address' : this.fromBuilder.group({
        'street' : new FormControl('',[Validators.required,Validators.minLength(2),CheckValidation.onlyWhiteSpaceValidation]),
        'city' : new FormControl('',[Validators.required,Validators.minLength(2),CheckValidation.onlyWhiteSpaceValidation]),
        'state' : new FormControl('',[Validators.required,Validators.minLength(2),CheckValidation.onlyWhiteSpaceValidation]),
        'zipCode' : new FormControl('',[Validators.required,Validators.pattern('[0-9]{5}')])
      })
    });
  }
  
  get firstName(){
     return this.theFormGroup.get('employee.firstName');}
  get lastName(){
    return this.theFormGroup.get('employee.lastName');}
  get department(){
    return this.theFormGroup.get('employee.department'); }
  get salary(){
    return this.theFormGroup.get('employee.salary');}
  get email(){
    return this.theFormGroup.get('employee.email');}
  get imageUrl(){return this.theFormGroup.get('employee.imageUrl');}
  get phoneNo(){
    return this.theFormGroup.get('employee.phoneNo');}
  get experianceYears(){
    return this.theFormGroup.get('employee.experianceYears');}

    // getter for address form control
    get street(){
      return this.theFormGroup.get('address.street');}
   get city(){
        return this.theFormGroup.get('address.city');}
   get state(){
          return this.theFormGroup.get('address.state');}
  get zipCode(){
            return this.theFormGroup.get('address.zipCode');}    
onSubmit(){

  if(this.theFormGroup.invalid){
    console.log("invalid");
    this.theFormGroup.markAllAsTouched();
  }
  else {

    this.employee.firstName = this.firstName.value;
 this.employee.lastName = this.lastName.value;
 this.employee.email = this.email.value;
 this.employee.salary = this.salary.value;
 this.employee.experienceYears = this.experianceYears.value;
 this.employee.phoneNo = this.phoneNo.value;
 this.employee.imageUrl = this.imageUrl.value;

this.address.street = this.street.value;
this.address.city = this.city.value;
this.address.state = this.state.value;
this.address.zipCode = this.zipCode.value;


for(let tempDept of this.departments){
  if(tempDept.name === this.department.value){
    this.departmentObject = tempDept;
  }
}
// let dep : string[] = this.department.value.split(" ",2);
// this.depart.id = +dep[0];
// this.depart.name = dep[1];

this.addEmployee.employee = this.employee;
this.addEmployee.address = this.address;
this.addEmployee.department = this.departmentObject;

this.addEmployeeService.addEmployee(this.addEmployee).subscribe(
  {next : data=>{
    this.addEmployeeService.setRegisteredEmployeeInfo(data.identification);
  this.router.navigateByUrl('/savedEmployee');
  },
    error: err=>{
      alert(err.message);
    }
    
  }
)


 //console.log(this.addEmployee);
 }
}
}
