import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TfaComponent } from './tfa.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { AuthResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';
import { authResetPasswordRoutes } from 'app/modules/auth/reset-password/reset-password.routing';

const example2Routes: Route[] = [
    {
        path     : '',
        component: TfaComponent
    }
];

@NgModule({
    declarations: [
        TfaComponent
        
    ],
    imports     : [
        RouterModule.forChild(example2Routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class TfaModule
{
}
