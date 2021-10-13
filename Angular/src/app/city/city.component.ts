import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { CityModel } from './city.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cityobj: CityModel = new CityModel();
  formValue !: FormGroup;
  cityData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;

  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.formValue = this.formBuilder.group({
      city: ['',Validators.required], 
    })

    this.getCity();
  }

  getCity() {       
    this.api.GetCity()
    .subscribe(res=>{
      this.cityData = res.employeeCity;
      
    })
    
  }

  addCity(){
    
    this.cityobj.City = this.formValue.value.city;

    this.api.PostCity(this.cityobj)
      .subscribe(res => {
        alert(res.message);
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getCity();
      })

  }

  editCity(){
    this.cityobj.City = this.formValue.value.city;

    this.api.UpdateCity(this.cityobj)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getCity();
    })

  }

  onUp(row : any){
    this.showUpdate = true;
    this.cityobj.Id = row.id;
    this.formValue.controls['city'].setValue(row.city);
   
    this.showAdd = false;

  }

  deleteCity(row : any){
    let clickedYes = confirm("Are you sure want to delete");
    
    if(clickedYes){
     this.api.DeleteCity(row.id)
     .subscribe(res=>{
       alert("Deleted Successfully");
       this.getCity();
     })
    } 
  }

}
