import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/Classes/Address';
import { CheckValidation } from 'src/app/Classes/CheckValidation';
import { AddEmployeeService } from 'src/app/services/add-employee.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit{
 
  address : Address;
 data : Address;
  theFormGroup : FormGroup;
  storage : Storage = localStorage;

  constructor(private addEmployeeService : AddEmployeeService,
              private formBuilder : FormBuilder,
              private addressObject : Address)
              {
            this.address = addEmployeeService.getAddressFromDB();

            if(this.address == null)
            this.address = JSON.parse(this.storage.getItem('address'));

              }

  ngOnInit(): void {

   this.theFormGroup = this.formBuilder.group({

    'address' : this.formBuilder.group({
      'street' : new FormControl(this.address.street,[Validators.required,Validators.minLength(2),CheckValidation.onlyWhiteSpaceValidation]),
      'city' : new FormControl(this.address.city,[Validators.required,Validators.minLength(2),CheckValidation.onlyWhiteSpaceValidation]),
      'state' : new FormControl(this.address.state,[Validators.required,Validators.minLength(2),CheckValidation.onlyWhiteSpaceValidation]),
      'zipCode' : new FormControl(this.address.zipCode,[Validators.required,Validators.pattern('[0-9]{5}')])
    })
   });

   
   this.storage.setItem('address',JSON.stringify(this.address));
  }

  get street(){
    return this.theFormGroup.get('address.street');}
 get city(){
      return this.theFormGroup.get('address.city');}
 get state(){
        return this.theFormGroup.get('address.state');}
get zipCode(){
          return this.theFormGroup.get('address.zipCode');}  

         
   onSubmit(){

    if(this.theFormGroup.invalid)
    this.theFormGroup.markAllAsTouched();
    else{
      // add the values to the address instance
      this.addressObject = this.address;
      this.addressObject.street = this.street.value;
      this.addressObject.city = this.city.value;
      this.addressObject.state = this.state.value;
      this.addressObject.zipCode = this.zipCode.value;

      this.addEmployeeService.updateAddress(this.addressObject).subscribe(
        {next : response =>{
          alert(`Changes has been saved successfully`);
        },
        error : err=>{
          alert(err.message);
        }
      });
    }
          }

}
