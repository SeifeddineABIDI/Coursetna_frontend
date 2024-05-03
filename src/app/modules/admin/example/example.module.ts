import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { Example2Component } from '../example2/example2.component';

const exampleRoutes: Route[] = [
    
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent,
        
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
    ]
})
export class ExampleModule
{
}
