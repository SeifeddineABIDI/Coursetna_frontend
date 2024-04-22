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
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(exampleRoutes),
    ]
})
export class ForumModule
{
}
