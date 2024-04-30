import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatRecComponent } from './stat-rec/stat-rec.component';
import { ReponseComponent } from './reponse/reponse.component';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ReponseComponent
    }
    
];


@NgModule({
    declarations: [
        ReponseComponent,
        
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
export class ReponseModule
{


}
