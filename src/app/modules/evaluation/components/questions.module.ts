import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions/questions.component';
import { ReactiveFormsModule } from '@angular/forms';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: QuestionsComponent
    }
];

@NgModule({
    declarations: [
        QuestionsComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        ReactiveFormsModule,

        
    ]
})
export class QuestionsModule
{
}
