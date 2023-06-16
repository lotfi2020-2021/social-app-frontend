import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../model/device';

import { AuthService } from './auth.service';



const API_URL = 'http://localhost:8082/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  tokenType  = 'Bearer ';
  token1 = this.tokenStorage.loadAuthTokenFromCache();

 

  constructor( private http: HttpClient,private tokenStorage: AuthService ) { }



  getDevices(): Observable<any> {
    const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
    const formData: FormData = new FormData();
   
    const requestOptions = { headers: header };
    return this.http.get(API_URL + 'Devices',requestOptions)
      
 
  }

  addDevice(device:any): Observable<Object> {
    const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
    const formData: FormData = new FormData();
   
    const requestOptions = { headers: header };
    return this.http.post(API_URL + 'Devices',device,requestOptions)
      
  
  }


  getdeviceByid(id:any): Observable<Object> {
    const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
    const formData: FormData = new FormData();
   
    const requestOptions = { headers: header };
    return this.http.get(API_URL + 'Devices/'+id,requestOptions)
      
  
  }
  updatedevice(id:any,device:Device): Observable<Object> {
    const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
    const formData: FormData = new FormData();
   
    const requestOptions = { headers: header };
    return this.http.put(API_URL + 'Devices/'+id,device,requestOptions)
      
  
  }


  deletedevice(id:any): Observable<Object> {
    const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
    const formData: FormData = new FormData();
   
    const requestOptions = { headers: header };
    return this.http.delete(API_URL + 'Devices/'+id,requestOptions)
      
  
  }






}
