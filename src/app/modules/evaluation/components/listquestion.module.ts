import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListQuestionComponent } from './list-question/list-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterQuestionPipe } from './list-question/filter.pipe';


const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ListQuestionComponent
    }
];

@NgModule({
    declarations: [
        ListQuestionComponent,
        FilterQuestionPipe,
        
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule
        

        
    ]
})
export class ListQuestionModule
{
}
