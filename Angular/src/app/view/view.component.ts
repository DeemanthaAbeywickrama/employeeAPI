import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeModel } from './view.model'; 



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})


export class ViewComponent implements OnInit {
  formValue !: FormGroup;
  employeeData !: any;
  employeeObj : EmployeeModel = new EmployeeModel();
  
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.formValue = this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        dob: ['',Validators.required],
        tpNo: ['',Validators.required],
        email: ['',Validators.required],
        status: ['',Validators.required],
        city: ['',Validators.required],
        remark: ['',Validators.required]
        
      })
      this.getEmployeeDetails();
    }

  

  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res.employeeDetails;
      
    })
  }

  deleteEmployeeDetail(row : any){
    let clickedYes = confirm("Are you sure want to delete");
    
    if(clickedYes){
     this.api.DeleteEmployee(row.id)
     .subscribe(res=>{
       alert("Deleted Successfully");
       this.getEmployeeDetails();
     })
    } 
  }

  editEmployeeDetail(){
  
     this.employeeObj.FirstName = this.formValue.value.firstName;
     this.employeeObj.LastName = this.formValue.value.lastName;
     this.employeeObj.DOB = this.formValue.value.dob;
     this.employeeObj.TPNo = this.formValue.value.tpNo;
     this.employeeObj.Email = this.formValue.value.email;
     this.employeeObj.MaritalStatus = this.formValue.value.status;
     this.employeeObj.City = this.formValue.value.city;
     this.employeeObj.Remark = this.formValue.value.remark;

    this.api.UpdateEmployee(this.employeeObj)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
    })
     this.showUpdate = false;
  }

  onEdit(row : any){
    this.showUpdate = true;
    this.employeeObj.Id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['tpNo'].setValue(row.tpNo);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['status'].setValue(row.maritalStatus);
    this.formValue.controls['city'].setValue(row.city);
    this.formValue.controls['remark'].setValue(row.remark);
    //this.showAdd = false;
  }

  

}
