import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Example2Component } from './example2.component';

const example2Routes: Route[] = [
    {
        path     : '',
        component: Example2Component
    }
];

@NgModule({
    declarations: [
        Example2Component
        
    ],
    imports     : [
        RouterModule.forChild(example2Routes)
    ]
})
export class Example2Module
{
}
