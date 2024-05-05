import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ReclamationComponent
    }
    
];


@NgModule({
    declarations: [
        ReclamationComponent,
        
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
export class ReclamationModule
{
}
