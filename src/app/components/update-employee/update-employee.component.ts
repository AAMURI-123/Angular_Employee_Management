import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckValidation } from 'src/app/Classes/CheckValidation';
import { Department } from 'src/app/Classes/Department';
import { EditEmployee } from 'src/app/Classes/EditEmployee';
import { Employee } from 'src/app/Classes/Employee';
import { AddEmployeeService } from 'src/app/services/add-employee.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
 
  employee : Employee;
  departments : Department[] = [];
  theFormGroup: FormGroup;

  storage : Storage = localStorage;

  currentDepartement : Department;


  constructor(private addEmployeeService : AddEmployeeService,
              private employeeService : EmployeeService,
              private updatedEmploye : Employee,
              private departmentObject : Department,
              private editEmployee : EditEmployee,
              private formBuilder : FormBuilder,
              private router : Router){
                this.employee = this.addEmployeeService.getEmployeeFromDB();
                if(this.employee == null){
                  this.employee = JSON.parse(this.storage.getItem('employee'));
                }
              }

  ngOnInit(): void {

   

    this.employeeService.getDepartments().subscribe(data => {
      this.departments = data;
      })
    
   // console.log(this.employee);

    this.theFormGroup = this.formBuilder.group({
      'employee' : this.formBuilder.group({
        'department' : new FormControl(this.employee.departmentName,[Validators.required]),
        'salary' : new FormControl(this.employee.salary,[Validators.required,Validators.minLength(4)]),
        'experianceYears' : new FormControl(this.employee.experienceYears,[Validators.required]),
        'email' : new FormControl(this.employee.email,[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        'phoneNo' : new FormControl(this.employee.phoneNo,[Validators.required,Validators.pattern('[0-9]{10}')]),
        'imageUrl' : new FormControl(this.employee.imageUrl,Validators.required)
      }),
    });

      this.storage.setItem('employee',JSON.stringify(this.employee));

  }
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
  

    onSubmit(){

      if(this.theFormGroup.invalid){
        this.theFormGroup.markAllAsTouched();
      }
      else{
        // populate the employee object with updated employee
        this.updatedEmploye = this.employee;
        this.updatedEmploye.experienceYears = this.experianceYears.value;
        this.updatedEmploye.salary = this.salary.value;
        this.updatedEmploye.email = this.email.value;
        this.updatedEmploye.phoneNo = this.phoneNo.value;
        this.updatedEmploye.imageUrl = this.imageUrl.value;
      
        for(let tempDept of this.departments){
          if(tempDept.name === this.department.value){
            this.departmentObject = tempDept;
          }
        }
        // let dept = this.department.value.split(' ',2);

        // if(+dept[0]){
        //   this.departmentObject.id = +dept[0];
        //   this.departmentObject.name = dept[1];
        // }
        
        // else{
        //   this.departmentObject.id = this.departmentId;
        //   this.departmentObject.name = this.department.value;
        // }
      
        this.editEmployee.employee = this.updatedEmploye;
        this.editEmployee.department = this.departmentObject;

        // pass the Updated Employee to server to PUT it.
        this.addEmployeeService.updateEmployee(this.editEmployee).subscribe({
          next:response =>{
            alert(`You have succefully updated.`);
            this.router.navigateByUrl('/employees');
          },
          error : err=>{
            alert(err.message)
          }
        })

        console.log(this.editEmployee);
  //console.log(this.employe);
      }
    }
}
