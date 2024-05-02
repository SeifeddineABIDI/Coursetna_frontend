import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatRecComponent } from './stat-rec/stat-rec.component';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ListReclamationComponent
    }
    
];


@NgModule({
    declarations: [
        ListReclamationComponent,
        
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
export class ListReclamationModule
{


}
