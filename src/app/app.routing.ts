import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { CreatePostComponent } from './modules/forum/post/create-post/create-post.component';
import { PostTitleComponent } from './modules/forum/shared/post-title/post-title.component';
import { ViewPostComponent } from './modules/forum/post/view-post/view-post.component';
import { HelpCenterComponent } from './modules/help-center/help-center.component';
import { CreateSubforumComponent } from './modules/forum/subforum/create-subforum/create-subforum.component';
import { ListSubforumComponent } from './modules/forum/subforum/list-subforum/list-subforum.component';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    
    

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'example'},
    

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)},
            

           

        ]   
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)},

        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
            
        ]
    },

    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},


            // {path: 'forum', component: HomeComponent },
            {path: 'view-post/:id', component: ViewPostComponent },
            {path: 'create-post', component: CreatePostComponent },
            {path: 'create-subforum', component: CreateSubforumComponent},
            //{path: 'help-center', component: HelpCenterComponent },
            {path: 'list-subforums', component: ListSubforumComponent},

            // {path: 'create-subforum', component: CreateSubforumComponent },
            {path: 'help-center', loadChildren: () => import('app/modules/help-center/help-center.module').then(m => m.HelpCenterModule)},

            {path: 'settings', loadChildren: () => import('app/modules/settings/settings.module').then(m => m.SettingsModule)},
            {path: 'forum', loadChildren: () => import('app/modules/forum/forum.module').then(m => m.ForumModule)}
        

            // {path: 'example2', loadChildren: () => import('app/modules/admin/example2/example2.module').then(m => m.Example2Module)},
            


        ]
    }
];
