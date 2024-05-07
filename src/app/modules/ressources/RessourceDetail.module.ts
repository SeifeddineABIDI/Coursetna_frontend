import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, Route, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { AngularFireModule } from '@angular/fire/compat'
import { RessourceListComponent } from './components/ressource-list/ressource-list.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { StarRatingComponent } from './components/ressource-detail/StarRatingComponent';
import { SharedModule } from './SharedModule.module';
import { RessourceDetailComponent } from './components/ressource-detail/ressource-detail.component';
import { ReadMoreDirective } from './components/ressource-detail/appReadMore';
import { MatIconModule } from '@angular/material/icon';


const exampleRoute: Route[] = [{
   path: '',
   component: RessourceDetailComponent
    
}];

@NgModule({
    declarations: [
      RessourceDetailComponent,
      ReadMoreDirective
        
    ],
    imports     : [
        SharedModule,    
        RouterModule.forChild(exampleRoute),
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        MatDialogModule,
        MatIconModule 
    ],
    providers: [
      provideAnimations()
    ]
   
})
export class RessourceDetailModule
{}