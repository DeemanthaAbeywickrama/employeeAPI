import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms'



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  formValue !: FormGroup;
  employeeData !: any;
  //employeeObj : EmployeeModel = new EmployeeModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getEmployeeDetails();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  // postEmployeeDetails() {
  //   this.employeeObj.FirstName = this.formValue.value.firstName;
  //    this.employeeObj.LastName = this.formValue.value.lastName;
  //    this.employeeObj.Email = this.formValue.value.email;
  //    this.employeeObj.Mobile = this.formValue.value.mobile;
  //    this.employeeObj.Salary = this.formValue.value.salary;
  //   this.api.PostEmployee(this.employeeObj)
  //     .subscribe(res => {
  //       console.log(res);
  //       let ref = document.getElementById('close');
  //     ref?.click();
  //     this.getEmployeeDetails();
  //     })
  // }
  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res.employeeDetails;
      
    })
  }
  // editEmployeeDetail(){
  //    this.employeeObj.FirstName = this.formValue.value.firstName;
  //    this.employeeObj.LastName = this.formValue.value.lastName;
  //    this.employeeObj.Email = this.formValue.value.email;
  //    this.employeeObj.Mobile = this.formValue.value.mobile;
  //    this.employeeObj.Salary = this.formValue.value.salary;
  //   this.api.UpdateEmployee(this.employeeObj)
  //   .subscribe(res=>{
  //     alert("Updated Successfully")
  //     let ref = document.getElementById('close');
  //     ref?.click();
  //     this.getEmployeeDetails();
  //   })
  // }
  // onEdit(row : any){
  //   this.employeeObj.Id = row.id;
  //   this.formValue.controls['firstName'].setValue(row.firstName);
  //   this.formValue.controls['lastName'].setValue(row.lastName);
  //   this.formValue.controls['email'].setValue(row.email);
  //   this.formValue.controls['mobile'].setValue(row.mobile);
  //   this.formValue.controls['salary'].setValue(row.salary);
  //   this.showUpdate = true;
  //   this.showAdd = false;
  // }

  // deleteEmployeeDetail(row : any){
  //  let clickedYes = confirm("Are you sure want to delete");
  //  if(clickedYes){
  //   this.api.DeleteEmployee(row.id)
  //   .subscribe(res=>{
  //     alert("Deleted Successfully");
  //     this.getEmployeeDetails();
  //   })
  //  }
    
  // }

}
