import { Component, Input, OnInit } from '@angular/core';
import { EmployeeModel } from './employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
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
  cityData !: any;


  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      dob: ['',Validators.required],
      tpno: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      status: ['',Validators.required],
      city: ['',Validators.required],
      remark: ['',Validators.required]
      
    })
    this.getEmployeeDetails();
    this.getAllCity();

  }

  getAllCity() {       
    this.api.GetAllCity()
    .subscribe(res=>{
      this.cityData = res.employeeCity;
      
    })
    
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

    this.formValue.reset();

  }

  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res.employeeDetails;
      
    })
  }

  clear(){
    this.formValue.reset();
  }

}
