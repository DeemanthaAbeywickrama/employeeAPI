import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { EmployeeComponent } from './employee/employee.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path: '', redirectTo: "/view", pathMatch: "full"},
  {path:'employee', component: EmployeeComponent },
  {path: 'view', component: ViewComponent},
  {path: 'city', component: CityComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
