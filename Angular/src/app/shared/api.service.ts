import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public employeeAPIUrl : string = "https://localhost:44389/api/Employee/";

  constructor(private _http: HttpClient) { }

  PostEmployee(data : any){
    return this._http.post<any>(`${this.employeeAPIUrl}add_employee`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteEmployee(id : number){
    return this._http.delete<any>(`${this.employeeAPIUrl}delete_employee/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateEmployee(data : any){
    return this._http.put<any>(`${this.employeeAPIUrl}update_employee`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetEmployees(){
    return this._http.get<any>(`https://localhost:44389/api/Employee/get_all_employees`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
