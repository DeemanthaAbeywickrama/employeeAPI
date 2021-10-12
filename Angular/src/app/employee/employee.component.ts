import { Component, Input, OnInit } from '@angular/core';
import { EmployeeModel } from './employee.model';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeObj : EmployeeModel = new EmployeeModel();
  formValue !: FormGroup;
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;


  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      tpno: [''],
      email: [''],
      status: [''],
      city: [''],
      remark: ['']
      
    })
    this.getEmployeeDetails();
  }

  addemployee() {
    this.employeeObj.FirstName = this.formValue.value.firstName;
    this.employeeObj.LastName = this.formValue.value.lastName;
    this.employeeObj.DOB = this.formValue.value.dob;
    this.employeeObj.TPNo = this.formValue.value.tpno;
    this.employeeObj.Email = this.formValue.value.email;
    this.employeeObj.MaritalStatus = this.formValue.value.status;
    this.employeeObj.City = this.formValue.value.city;
    this.employeeObj.Remark = this.formValue.value.remark;
     
    this.api.PostEmployee(this.employeeObj)
      .subscribe(res => {
        alert(res.message);
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
      })

  }

  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res.employeeDetails;
      
    })
  }

}
