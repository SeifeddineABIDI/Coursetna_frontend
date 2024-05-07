import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule } from '@angular/forms';
import { FilterQuizPipe } from './quiz/filter.pipe';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: QuizComponent
    }
];

@NgModule({
    declarations: [
        QuizComponent,
        FilterQuizPipe
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        FormsModule,
        
    ]
})
export class QuizModule
{
}
