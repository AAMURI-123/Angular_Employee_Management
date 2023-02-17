import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import {HttpClientModule} from '@angular/common/http';
import { AddressComponent } from './components/address/address.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SavedEmployeeComponent } from './components/saved-employee/saved-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { UpdateAddressComponent } from './components/update-address/update-address.component';
// import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



const routes : Routes = [
  {path:"address/:id/edit", component : UpdateAddressComponent},
  {path : "address/:id", component : AddressComponent},
  {path:"search/:keyword", component: SearchComponent},
  {path:"employee/edit", component:UpdateEmployeeComponent},
  {path:"employee",component:EmployeeComponent},
  {path: "addEmployee",component: AddEmployeeComponent},
  {path:"savedEmployee",component:SavedEmployeeComponent},
  {path:"", component : EmployeeComponent},
  {path:"**", component:PageNotFoundComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddressComponent,
    SearchComponent,
    AddEmployeeComponent,
    SavedEmployeeComponent,
    UpdateEmployeeComponent,
    UpdateAddressComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
   NgbModule,
   NgbPaginationModule,
   NgbAlertModule
    // NgbModule,
    // NgbPaginationModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
