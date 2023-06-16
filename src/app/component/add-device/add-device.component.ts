import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from 'src/app/model/device';
import { DeviceService } from 'src/app/service/device.service';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  deviceCreation:  Device = new Device();

  
  constructor(   private router :Router , private deviceService:DeviceService) { }

  ngOnInit(): void {
  }

  saveDevice(){
 
    this.deviceService.addDevice(this.deviceCreation).subscribe(res =>{
      console.log('res',res)
     
      this.router.navigateByUrl('/admin');

      console.warn(this.deviceCreation)
   
    })
  
  }


 

  showaddDevice(){

    this.router.navigateByUrl('/addDevice')
  }

  alldevices(){
    this.router.navigateByUrl('/admin')

  }

}