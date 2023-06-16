import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/common/app-constants';
import { Location } from '@angular/common'
import { UserResponse } from 'src/app/model/user-response';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
telephone:any
message:any
title:any
User:any
userId:any
photoprofile:any
  constructor(private userService:UserService,private authService:AuthService,private router:Router,
    private route :ActivatedRoute,private location:Location,private toast:NgToastService) { }

  ngOnInit(): void {
  if (!this.authService.isUserLoggedIn()) {
    this.router.navigateByUrl('/login');
  } else {
   this.userId=  this.route.snapshot.params['userId'];
    



   this.userService.getUserById(this.userId).subscribe({
        next: (data: any) => {
          this.User = data 
          this.telephone =data.user.telephone;
console.warn('user'+this.User)
console.warn('phone'+ this.telephone)


     
      
  if(data.user.profilePhoto===null){
    this.photoprofile= environment.defaultProfilePhotoUrl
   
  }else{

    this.photoprofile= data.user.profilePhoto


  }
  
    console.warn('el',this.User)
    

        
        },
        error: (errorResponse: HttpErrorResponse) => {
          localStorage.setItem(AppConstants.messageTypeLabel, AppConstants.errorLabel);
          localStorage.setItem(AppConstants.messageHeaderLabel, AppConstants.notFoundErrorHeader);
          localStorage.setItem(AppConstants.messageDetailLabel, AppConstants.notFoundErrorDetail);
          localStorage.setItem(AppConstants.toLoginLabel, AppConstants.falseLabel);
         
          this.router.navigateByUrl('/message');
        }
      })
    ;
  }

  
}

back(): void {
  this.location.back()
  }



  sendmessage(){
 
    this.userService.sendSms(this.telephone,this.title,this.message).subscribe(data  => {
  })

  this.toast.success({detail:"message",summary:"message send sucessfully ",duration:6000});
  
  }

}
