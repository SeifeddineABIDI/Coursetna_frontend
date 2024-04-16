import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    styleUrls    : ['./sign-up.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                firstname      : ['', Validators.required],
                lastname      : ['', Validators.required],
                email     : ['', [Validators.required]],
                password  : ['', Validators.required],
                image  : [''],

                agreements: ['', Validators.requiredTrue]
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }
        const nom = this.signUpForm.get('firstname').value;
        const prenom = this.signUpForm.get('lastname').value;
        const email = this.signUpForm.get('email').value;
        const password = this.signUpForm.get('password').value;
        const photo: File = this.imageFile;      
        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;
        // Sign up
        this._authService.signUp(nom, prenom, email, password, photo)
            .subscribe(
                
                (response) => {
                    console.log(response);
                    this.signUpForm.enable();
                    
                    // Reset the form
                    this.signUpForm.reset();
                    if (response.error) {
                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: response.error
                        };
                        // Show the alert
                        this.showAlert = true;
                    // Set the alert
                }else{
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');}
                },
                (error) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Something went wrong, please try again.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
    imageUrl: string | ArrayBuffer | null = null;
    imageFile: File;
    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.imageFile = file;
        this.signUpForm.patchValue({
          photo: file
        });
      }
}
