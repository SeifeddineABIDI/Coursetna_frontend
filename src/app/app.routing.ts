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

        /*****evaluation**** */
            {path: 'statistique', loadChildren: () => import('app/modules/evaluation/components/stat.module').then(m => m.StatModule)},
            {path: 'quizList', loadChildren: () => import('app/modules/evaluation/components/quizlist.module').then(m => m.QuizlistModule)},
            {path: 'questions/:id', loadChildren: () => import('app/modules/evaluation/components/questions.module').then(m => m.QuestionsModule)},
            {path: 'addquestion/:id', loadChildren: () => import('app/modules/evaluation/components/addquestion.module').then(m => m.AddQuestionModule)},
            {path: 'listquestion/:id', loadChildren: () => import('app/modules/evaluation/components/listquestion.module').then(m => m.ListQuestionModule)},
            //simple utilisateur routes/
            {path: 'quiz', loadChildren: () => import('app/modules/evaluation/components/quiz.module').then(m => m.QuizModule)},
            {path: 'answers/:id', loadChildren: () => import('app/modules/evaluation/components/listanswer.module').then(m => m.ListAnswerModule)},

            /*****end evaluation**** */

        /**********Ressources********** */
            { path: 'ressources-by-topic/:topicId', loadChildren: () => import('./modules/ressources/ressourceList.module').then(m => m.RessourceListModule) },
            { path: 'acceuil', loadChildren: () => import('./modules/ressources/homeList.module').then(m => m.HomeListModule) },
            { path: 'ressource/:id', loadChildren: () => import('./modules/ressources/RessourceDetail.module').then(m => m.RessourceDetailModule) },
            { path: 'topic/:option', loadChildren: () => import('./modules/ressources/topicList.module').then(m => m.TopicListModule) },
            { path: 'addTopic', loadChildren: () => import('./modules/ressources/topicAdd.module').then(m => m.TopicAddModule) },
            { path: 'add', loadChildren: () => import('./modules/ressources/ressourceAdd.module').then(m => m.RessourceAddModule) },
            { path: 'detailRs/:id', loadChildren: () => import('./modules/ressources/newRessource.module').then(m => m.DetailNewRessourceModule) },
        /*******end Ressources*************** */

        /******Reclamation ************** */
            {path: 'reclamation', loadChildren: () => import('app/modules/Reclamation/reclamation.module').then(m => m.ReclamationModule)},
            {path: 'addreclamation', loadChildren: () => import('app/modules/Reclamation/ajouter-reclamation.module').then(m => m.AjouterReclamationModule) },
            {path: 'stat', loadChildren: () => import('app/modules/Reclamation/stat-rec.module').then(m => m.StatRecModule) },
          //  {path: 'reponse', loadChildren: () => import('app/modules/Reclamation/reponse.module').then(m => m.ReponseModule) },
            {path: 'listReclamation', loadChildren: () => import('app/modules/Reclamation/list-reclamation.module').then(m => m.ListReclamationModule) },

        /*********end Reclamation ******** */
            // {path: 'forum', component: HomeComponent },
            {path: 'view-post/:id', component: ViewPostComponent },
            {path: 'create-post', component: CreatePostComponent },
            {path: 'create-subforum', component: CreateSubforumComponent},
            //{path: 'help-center', component: HelpCenterComponent },
            {path: 'list-subforums', component: ListSubforumComponent},

            // {path: 'create-subforum', component: CreateSubforumComponent },
            {path: 'help-center', loadChildren: () => import('app/modules/help-center/help-center.module').then(m => m.HelpCenterModule)},

            {path: 'forum', loadChildren: () => import('app/modules/forum/forum.module').then(m => m.ForumModule)},
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'example2', loadChildren: () => import('app/modules/admin/example2/example2.module').then(m => m.Example2Module)},
            {path: 'settings', loadChildren: () => import('app/modules/settings/settings.module').then(m => m.SettingsModule)},
            {path: 'forgot', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: '**', pathMatch : 'full', redirectTo: 'example'},

            
            


        ]
    }
];
