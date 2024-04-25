import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: QuizListComponent
    }
];

@NgModule({
    declarations: [
        QuizListComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        ReactiveFormsModule,
        
    ]
})
export class QuizlistModule
{
}
