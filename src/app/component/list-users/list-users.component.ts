import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  phone=false
users:any;
  afterFilter:any
  userRole:any
  searchByName:any = ''
  searchByrole:any
 photoprofile:any;
 user:any;
 user2:any;
 role:any;
 userBlock:any
  
  constructor(private userService :UserService , private router :Router, private authService :AuthService,private toast:NgToastService) { }

  ngOnInit(): void {

    this.getUsers();
  }


getUsers(){

    this.userService.getusers().subscribe(data  => {
         
     this.users = data;
     this.afterFilter = this.users;
   
     console.warn('usersssss',this.users)
     data.forEach( (el :any ) => {
     
      if(el.telephone===null){
       this.phone=true
      }else{

        this.phone=false
      }
      if(el.profilePhoto===null){
        el.profilePhoto= environment.defaultProfilePhotoUrl
      }else{

        this.photoprofile= el.profilePhoto


      }
      
        console.warn('el',this.users)
        
    })
   
     })

    }


    showAddmoderateur(){
      this.router.navigate(['addModerateur'])
    }

    filterArray() {


      this.afterFilter = this.users.filter(

       ( _:any) =>
       
           _.firstName
           
            .toString()
            .toLocaleLowerCase()
            .includes(this.searchByName.trim().toLowerCase())
            

           


      );
   
    }




    filterArray2() {
      this.afterFilter = this.users.filter(
  
       ( _:any) =>
       
           _.role
           .toString()
           .toLocaleLowerCase()
            .includes(this.searchByrole.trim().toLowerCase()) ,
      
      


      );
   
    }


showDetailsUser(id:any){


this.router.navigate(['users', id]); 

}

showSendSMS(id:any){


  this.router.navigate(['sms', id]); 
  
  }

updateRole(id:any){

  this.userService.getUserById(id).subscribe(data1  => {
       this.user=data1  
  
    if('moderateur'==  this.user.user.role){

      this.userService.updateRoleToUser(id).subscribe(data  => {
         
        this.userRole = data;
        
    window.location.reload();
    
    })}

    else  {
      this.userService.updateRoleToModerateur(id).subscribe(data  => {
         
        this.userRole = data;
        
    window.location.reload();
    
    })
    

      
    }})}




    reloadPage(){
  window.location.reload();
}
   
 
bloquerOrDebloquer(id:any){
  this.user2= this.authService.getAuthUserId()
 console.warn('users2'+this.users)
 console.warn('user connecté'+this.authService.getAuthUserId)
  this.users.forEach( (el :any ) => {
    
    if(this.authService.getAuthUserFromCache().id == id){

      this.toast.warning({detail:"failed block",summary:'can not block your self ',duration:6000});
          
      setTimeout(this.reloadPage,3000)
     
    }
    
     else  {
       this.userService.bloquerOrDebloquer(id).subscribe(data  => {
          
         this.userBlock = data;
         if(   this.userBlock.enabled==false){
          this.toast.success({detail:" block sucessfully",summary:'can not block your self ',duration:6000}); 
          setTimeout(this.reloadPage,3000)
         }else{

          this.toast.success({detail:" deblock sucessfully",summary:'can not block your self ',duration:6000}); 
          setTimeout(this.reloadPage,3000)
         }
      
     
     })
     
    
       
     }
      
  })
    
    

}


}
