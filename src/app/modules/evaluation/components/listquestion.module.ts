import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListQuestionComponent } from './list-question/list-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatChartComponent } from './stat-chart/stat-chart.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ListQuestionComponent
    }
];

@NgModule({
    declarations: [
        ListQuestionComponent,
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        ReactiveFormsModule,
        

        
    ]
})
export class ListQuestionModule
{
}
