import { MatDialog } from '@angular/material/dialog';
import { User } from './../../../core/user/user.types';
import { FuseAlertService } from './../../../../@fuse/components/alert/alert.service';
import { UserService } from 'app/core/user/user.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit
{     currentUserString = localStorage.getItem('currentUser');
    currentUser = JSON.parse(this.currentUserString);
    accountForm: UntypedFormGroup;
    token: string;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private _dialog: MatDialog

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
       
        this.token = localStorage.getItem('access_token');
        console.log(this.currentUser);
        // Create the form
        this.accountForm = this._formBuilder.group({
            nom    : [this.currentUser.nom, Validators.required],
            prenom: [this.currentUser.prenom, Validators.required],

            email   : [this.currentUser.email, [Validators.required, Validators.email]],
        });
    }
    saveUser(): void {
        if (this.accountForm.valid) {
let user = new User();
            user.email= this.accountForm.get('email').value;
            user.prenom= this.accountForm.get('prenom').value;
            user.nom= this.accountForm.get('nom').value;
            console.log(user);

            // Retrieve updated form values
            const updatedUserData = this.accountForm.value;
            this._userService.updateUser(user,this.token).subscribe(
                (updatedUser: User) => {
                  // Handle success
                  localStorage.removeItem('currentUser');
                  localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                },
                (error) => {
                  console.error('Error updating user:', error);
                  // Handle error
                }
              );
        } else {
            // Form is invalid, handle accordingly (e.g., display error messages)
        }
    }
    
}
