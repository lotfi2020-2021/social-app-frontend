import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';
import { PostResponse } from '../model/post-response';
import { ResetPassword } from '../model/reset-password';
import { UpdateUserEmail } from '../model/update-user-email';
import { UpdateUserInfo } from '../model/update-user-info';
import { UpdateUserPassword } from '../model/update-user-password';
import { User } from '../model/user';
import { UserResponse } from '../model/user-response';
import { AuthService } from './auth.service';


const API_URL = 'http://localhost:8082/api/v1/';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	private host = environment.apiUrl;
	private jwtService = new JwtHelperService();
	tokenType  = 'Bearer ';
	token1 = this.tokenStorage.loadAuthTokenFromCache();
  
   
  
	constructor( private httpClient: HttpClient,private tokenStorage: AuthService ) { }
  
	createModerateur(userSignup:any): Observable<Object> {
		const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
		const formData: FormData = new FormData();
	   
		const requestOptions = { headers: header };
		return this.httpClient.post(API_URL + 'CreateModerateur',userSignup,requestOptions)
		  
	  
	  }

	    
	  createAdmin(userSignup:any): Observable<Object> {
		const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
		const formData: FormData = new FormData();
	   
		const requestOptions = { headers: header };
		return this.httpClient.post(API_URL + 'CreateAdmin',userSignup,requestOptions)
		  
	  
	  }

	 
  
	getusers(): Observable<any> {
	  const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
	  const formData: FormData = new FormData();
	 
	  const requestOptions = { headers: header };
	  return this.httpClient.get(API_URL + 'Users',requestOptions)
		
   
	}

	sendSms(telephone:any,title:any,message:any): Observable<any> {
		const formData: FormData = new FormData();
	   
		return this.httpClient.post('http://41.226.169.210/API/sendsms.php?SPID=12&LOGIN=swatek&PASS=swatek2018&TEXT='+message+'&SC='+title+'&MOBILE=216'+telephone,formData)
		
	 
	  }


	updateRoleToUser( id:any): Observable<any> {
		const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
		const formData: FormData = new FormData();
	   
		const requestOptions = { headers: header };
		return this.httpClient.put(API_URL + 'Role/User/'+id,requestOptions)
		  
	 
	  }
	  updateRoleToModerateur( id:any): Observable<any> {
		const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
		const formData: FormData = new FormData();
	   
		const requestOptions = { headers: header };
		return this.httpClient.put(API_URL + 'Role/Moderateur/'+id,requestOptions)
		  
	 
	  }


	  updateRoleToAdmin( id:any): Observable<any> {
		const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
		const formData: FormData = new FormData();
	   
		const requestOptions = { headers: header };
		return this.httpClient.put(API_URL + 'Role/Admin/'+id,requestOptions)
		  
	 
	  }

	  bloquerOrDebloquer( id:any): Observable<any> {
		const header = new HttpHeaders().set('Authorization', this.tokenType +this.token1);
		const formData: FormData = new FormData();
	   
		const requestOptions = { headers: header };
		return this.httpClient.put(API_URL + 'User/Bloquer/'+id,requestOptions)
		  
	 
	  }

	getUserById(userId: number): Observable<UserResponse | HttpErrorResponse> {
		return this.httpClient.get<UserResponse | HttpErrorResponse>(`${this.host}/users/${userId}`);
	}

	getUserFollowingList(userId: number, page: number, size: number): Observable<UserResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.httpClient.get<UserResponse[] | HttpErrorResponse>(`${this.host}/users/${userId}/following`, { params: reqParams });
	}

	getUserFollowerList(userId: number, page: number, size: number): Observable<UserResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.httpClient.get<UserResponse[] | HttpErrorResponse>(`${this.host}/users/${userId}/follower`, { params: reqParams });
	}

	getUserPosts(userId: number, page: number, size: number): Observable<PostResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.httpClient.get<PostResponse[] | HttpErrorResponse>(`${this.host}/users/${userId}/posts`, { params: reqParams });
	}

	verifyEmail(token: string): Observable<HttpResponse<any> | HttpErrorResponse> {
		return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/verify-email/${token}`, null);
	}

	updateUserInfo(updateUserInfo: UpdateUserInfo): Observable<User | HttpErrorResponse> {
		return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/account/update/info`, updateUserInfo);
	}

	updateUserEmail(updateUserEmail: UpdateUserEmail): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/account/update/email`, updateUserEmail);
	}

	updateUserPassword(updateUserPassword: UpdateUserPassword): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/account/update/password`, updateUserPassword);
	}

	updateProfilePhoto(profilePhoto: File): Observable<User | HttpErrorResponse> {
		const formData = new FormData();
		formData.append('profilePhoto', profilePhoto);
		return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/account/update/profile-photo`, formData);
	}

	updateCoverPhoto(coverPhoto: File): Observable<User | HttpErrorResponse> {
		const formData = new FormData();
		formData.append('coverPhoto', coverPhoto);
		return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/account/update/cover-photo`, formData);
	}

	followUser(userId: number): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/account/follow/${userId}`, null);
	}

	unfollowUser(userId: number): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/account/unfollow/${userId}`, null);
	}

	getUserSearchResult(key: string, page: number, size: number): Observable<UserResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('key', key).set('page', page).set('size', size);
		return this.httpClient.get<UserResponse[] | HttpErrorResponse>(`${this.host}/users/search`, { params: reqParams });
	}

	forgotPassword(email: string): Observable<any | HttpErrorResponse> {
		const reqParams = new HttpParams().set('email', email);
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/forgot-password`, null, { params: reqParams });
	}

	resetPassword(token: string, resetPassword: ResetPassword): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}/reset-password/${token}`, resetPassword);
	}
}
