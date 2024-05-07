import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

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
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
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
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
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
            { path: 'ressources-by-topic/:topicId', loadChildren: () => import('./modules/ressources/ressourceList.module').then(m => m.RessourceListModule) },
            // { 
            //     path: 'ressources-by-topic/:topicId/:category', 
            //     loadChildren: () => import('./modules/ressources/ressourceList.module').then(m => m.RessourceListModule) 
            //   },
            { path: 'acceuil', loadChildren: () => import('./modules/ressources/homeList.module').then(m => m.HomeListModule) },
            { path: 'ressource/:id', loadChildren: () => import('./modules/ressources/RessourceDetail.module').then(m => m.RessourceDetailModule) },
            { path: 'topic/:option', loadChildren: () => import('./modules/ressources/topicList.module').then(m => m.TopicListModule) },
            { path: 'addTopic', loadChildren: () => import('./modules/ressources/topicAdd.module').then(m => m.TopicAddModule) },
            { path: 'add', loadChildren: () => import('./modules/ressources/ressourceAdd.module').then(m => m.RessourceAddModule) },
            { path: 'detailRs/:id', loadChildren: () => import('./modules/ressources/newRessource.module').then(m => m.DetailNewRessourceModule) },
            { path: 'stat', loadChildren: () => import('./modules/ressources/statRessource.module').then(m => m.statRessource) },
            { path: 'ressources/:id/versions', loadChildren: () => import('./modules/ressources/versionRessource.module').then(m => m.VersionRessourceModule) },
            { path: 'ressources/:id/versions', loadChildren: () => import('./modules/ressources/versionRessource.module').then(m => m.VersionRessourceModule) },
            { path: 'delete/:id/versions', loadChildren: () => import('./modules/ressources/versionRessourceDelete.module').then(m => m.VersionDeleteModule) },
            { path: 'ajouter-version/:id', loadChildren: () => import('./modules/ressources/addVersion.module').then(m => m.AddVersionModule) },
            { path: 'espaceUser', loadChildren: () => import('./modules/ressources/espaceRessource.module').then(m => m.EspaceRessourceUserModule) },
            { path: 'delete/:id/versions', loadChildren: () => import('./modules/ressources/versionRessourceDelete.module').then(m => m.VersionDeleteModule) },



           

        ]
    }
];
