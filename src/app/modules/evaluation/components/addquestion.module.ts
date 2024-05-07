import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions/questions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddQuestionComponent } from './add-question/add-question.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: AddQuestionComponent
    }
];

@NgModule({
    declarations: [
        AddQuestionComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        ReactiveFormsModule,
        
    ]
})
export class AddQuestionModule
{
}
