import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/common/app-constants';
import { RepeatPasswordMatcher } from 'src/app/common/repeat-password-matcher';
import { User } from 'src/app/model/user';
import { UserSignup } from 'src/app/model/user-signup';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit, OnDestroy {
	
	submittingForm: boolean = false;
	signupFormGroup: FormGroup;

	private subscriptions: Subscription[] = [];

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private router: Router,
		private formBuilder: FormBuilder,
		private matSnackbar: MatSnackBar) { }

	ngOnInit(): void {

		this.signupFormGroup = this.formBuilder.group({
			infoGroup: this.formBuilder.group({
				firstName: new FormControl('',
					[Validators.required, Validators.maxLength(64)]
				),
				lastName: new FormControl('',
					[Validators.required, Validators.maxLength(64)]
				),
				email: new FormControl('',
					[Validators.required, Validators.email, Validators.maxLength(64)]
				)
			}),
			
		});

	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	get firstName() { return this.signupFormGroup.get('infoGroup.firstName') }
	get lastName() { return this.signupFormGroup.get('infoGroup.lastName') }
	get email() { return this.signupFormGroup.get('infoGroup.email') }


	

	handleSignup(): void {
		if (this.signupFormGroup.valid) {
			this.submittingForm = true;
			const userSignup = new UserSignup();
			userSignup.firstName = this.firstName?.value;
			userSignup.lastName = this.lastName?.value;
			userSignup.email = this.email?.value;
			

			this.subscriptions.push(
				this.userService.createAdmin(userSignup).subscribe({
					next: (response: HttpResponse<User>) => {
						localStorage.setItem(AppConstants.messageTypeLabel, AppConstants.successLabel);
						localStorage.setItem(AppConstants.messageHeaderLabel, AppConstants.signupSuccessHeader);
						localStorage.setItem(AppConstants.messageDetailLabel, AppConstants.signupSuccessDetail);
						localStorage.setItem(AppConstants.toLoginLabel, AppConstants.trueLabel);
						this.submittingForm = false;
						this.router.navigateByUrl('/message2');
					},
					error: (errorResponse: HttpErrorResponse) => {
						let validationErrors = errorResponse.error.validationErrors;
						if (validationErrors = null) {
							this.matSnackbar.openFromComponent(SnackbarComponent, {
								data: AppConstants.snackbarErrorContent,
								panelClass: ['bg-danger'],
								duration: 5000
							});
						} 
						this.submittingForm = false;
					}
				})
			);
		}
	}
}
