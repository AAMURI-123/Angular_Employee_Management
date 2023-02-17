import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeManagement';

  constructor(private router : Router){}
  search(input : string){
   // console.log(input);
    this.router.navigateByUrl(`search/${input}`);
  }
}
