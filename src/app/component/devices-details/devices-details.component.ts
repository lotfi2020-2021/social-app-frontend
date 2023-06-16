import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/model/device';
import { DeviceService } from 'src/app/service/device.service';

@Component({
  selector: 'app-devices-details',
  templateUrl: './devices-details.component.html',
  styleUrls: ['./devices-details.component.css']
})
export class DevicesDetailsComponent implements OnInit {
  id:any
  deviceId:any
  device:any
  createdExist:any
  updatedAt:any
  divUpdated=true
   
    deviceCreation: Device = {
      id: 0,
      description: '',
      name: '',
      type: '',
      adresse: '',
      ville: '',
      code_postal: 0,
      telephone: '',
      date_exp: '',
      createdAt: '',
      updatedAt: '',
      serie: '',
    };
    devicedetails: Device = {
      id: 0,
      description: '',
      name: '',
      type: '',
      adresse: '',
      ville: '',
      code_postal: 0,
      telephone: '',
      date_exp: '',
      createdAt: '',
      updatedAt: '',
      serie: '',
    };
   
    constructor( private route :ActivatedRoute, private deviceService :DeviceService, private router:Router) { }
  
    ngOnInit(): void {
      this.id=this.deviceId
      this.deviceId = this.route.snapshot.params['deviceId'];
      console.log('hhhhhhhh'+ this.route.snapshot.params['deviceId'])
  
  this.GettDeviceByid()
  
  
    }
  
  
    GettDeviceByid(){
      this.deviceService.getdeviceByid(this.deviceId).subscribe(res => {
        
       this.device=res
       this.deviceCreation  = {
        id :  this.device.id_device  ,
        description :  this.device.description,
        serie: this.device.serie,
        createdAt: this.device.createdAt,
      updatedAt: this.device.updatedAt,
      name: this.device.name,
      type: this.device.type,
      adresse:this.device.adresse,
      ville: this.device.ville,
      code_postal:this.device.code_postal,
      telephone:this.device.telephone,
      date_exp : this.device.date_exp,
      
  
      };  
  
  
  
      this.devicedetails  = {
        id :  this.device.id_device  ,
        description :  this.device.description,
        serie: this.device.serie,
        createdAt: this.device.createdAt,
      updatedAt: this.device.updatedAt,
      name: this.device.name,
      type: this.device.type,
      adresse:this.device.adresse,
      ville: this.device.ville,
      code_postal:this.device.code_postal,
      telephone:this.device.telephone,
      date_exp : this.device.date_exp,
      
  
      };
      console.warn('dfsdcsdfdscsdc', res)
  
  if( this.device.updatedAt==null)
  
  this.divUpdated=false ;
      })
    
    }
  
  
  UpdateDevice(){
  
  this.deviceService.updatedevice(this.deviceId,this.deviceCreation).subscribe()
  window.location.reload();
  
  }
  
  DeleteDevice(){
  this.deviceService.deletedevice(this.deviceId).subscribe()
  
  this.router.navigate(['admin'])
  }
  
  
  }
