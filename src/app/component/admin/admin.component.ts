import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DeviceService } from '../../service/device.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  devices:any
  type:any;
  afterFilter:any
  searchByName:any = ''
  device: any = {
    name: null,
   
  };
  
  constructor(private deviceService :DeviceService , private router :Router ,private authService:AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isUserLoggedIn()) {
			this.router.navigateByUrl('/login');
		} else {

    this.getDevices();
  }
  }

getDevices(){

    this.deviceService.getDevices().subscribe(data  => {
         
     this.devices = data;
     this.afterFilter = this.devices;
     console.warn('devicessssssssssssssssssssss',this.devices)
     data.forEach( (el :any ) => {

      //this.device=el
      
        console.warn('el',this.devices)
        
    })
   
     })

    }

    addDevice(){

      this.router.navigateByUrl('/addDevice')
    }

    alldevices(){
      this.router.navigateByUrl('/admin')


    }

    detailsDevice(id:Number){
      this.router.navigate(['devicedetails/'+id])


    }
    
    filterArray() {
      this.afterFilter = this.devices.filter(
  
       ( _:any) =>
       
           _.name
            .toString()
            .toLocaleLowerCase()
            .includes(this.searchByName.trim().toLowerCase()) 
      
      );
   
    }
  
  
    showAddDevice(){
      this.router.navigate(['addDevice'])
    }


    showlistUsers(){
      this.router.navigate(['users'])
    }
}
