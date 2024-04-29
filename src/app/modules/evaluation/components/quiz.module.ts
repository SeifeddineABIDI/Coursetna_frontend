import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz/quiz.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: QuizComponent
    }
];

@NgModule({
    declarations: [
        QuizComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        
    ]
})
export class QuizModule
{
}
