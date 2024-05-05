import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatRecComponent } from './stat-rec/stat-rec.component';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: StatRecComponent
    }
    
];


@NgModule({
    declarations: [
        StatRecComponent,
        
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
    ]
})
export class StatRecModule
{


}
