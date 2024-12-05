import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ForumComponent } from './forum.component';
import { PostTitleComponent } from './shared/post-title/post-title.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { SubforumSideBarComponent } from './shared/subforum-side-bar/subforum-side-bar.component';
import { VoteButtonComponent } from './shared/vote-button/vote-button.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CreateSubforumComponent } from './subforum/create-subforum/create-subforum.component';
import { ListSubforumComponent } from './subforum/list-subforum/list-subforum.component';



const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ForumComponent
    }
];

@NgModule({
    declarations: [
        ForumComponent,
        PostTitleComponent,
        SideBarComponent,
        SubforumSideBarComponent,
        VoteButtonComponent,
        CreatePostComponent,
        ViewPostComponent,
        CreateSubforumComponent,
        ListSubforumComponent,
        
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(exampleRoutes),
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        EditorModule,
        
        
      
        
        
    ]
})
export class ForumModule
{
}
