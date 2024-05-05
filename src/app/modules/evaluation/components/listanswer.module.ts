import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListQuestionComponent } from './list-question/list-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterQuestionPipe } from './list-question/filter.pipe';
import { ListAnswerComponent } from './list-answer/list-answer.component';


const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ListAnswerComponent
    }
];

@NgModule({
    declarations: [
        ListAnswerComponent,        
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule
        

        
    ]
})
export class ListAnswerModule
{
}
