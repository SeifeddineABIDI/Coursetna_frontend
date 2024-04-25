import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';

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
        RouterModule.forChild(exampleRoutes)
    ]
})
export class QuizlistModule
{
}
