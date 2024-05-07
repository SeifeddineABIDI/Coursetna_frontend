import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { StatComponent } from './stat/stat.component';
import { ChartsModule } from 'ng2-charts';


const exampleRoutes: Route[] = [
    {
        path     : '',
        component: StatComponent
    }
];

@NgModule({
    declarations: [
        StatComponent,
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        ChartsModule,   
        
    ]
})
export class StatModule
{
}
