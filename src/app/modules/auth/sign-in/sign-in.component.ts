import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    token: string|undefined;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    )
    {
        this.token = undefined;
    }
    public send(form: NgForm): void {
        if (form.invalid) {
          for (const control of Object.keys(form.controls)) {
            form.controls[control].markAsTouched();
          }
          return;
        }
    
        console.debug(`Token [${this.token}] generated`);
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
        this.signInForm = this._formBuilder.group({
            email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
            password  : ['admin', Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;
        const credentials = {
            email: this.signInForm.value.email,
            password: this.signInForm.value.password
        };
        // Sign in
        this._authService.signIn(credentials)
            .subscribe(
                
                (response) => {

                    // Re-enable the form
                    this.signInForm.enable();
                    
                    // Reset the form
                    this.signInNgForm.resetForm();
                    
                    if (response.error) {
                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: response.error
                        };
                        // Show the alert
                        this.showAlert = true;
                    // Set the alert
                } else {
                    
                    // Set the redirect url
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    if (redirectURL === '/example') {
                        this._router.navigateByUrl(redirectURL);
                    } else {
                        this._router.navigateByUrl('/example');
                    }
                    // Navigate to the redirect url
                }
                },
                (error) => {
                    // Re-enable the form
                    this.signInForm.enable();
    
                    // Reset the form
                    this.signInNgForm.resetForm();
    
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Wrong email or password'
                    };
                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
