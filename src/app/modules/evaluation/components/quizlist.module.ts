import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './quiz-list/filter.pipe';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: QuizListComponent
    }
];

@NgModule({
    declarations: [
        QuizListComponent,
        FilterPipe
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule
        
    ]
})
export class QuizlistModule
{
}
