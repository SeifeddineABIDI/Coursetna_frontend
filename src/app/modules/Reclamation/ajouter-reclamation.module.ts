import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Route, RouterModule } from '@angular/router';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { AjouterReclamationComponent } from './ajouter-reclamation/ajouter-reclamation.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: AjouterReclamationComponent
    },
    
];

@NgModule({
    declarations: [
        AjouterReclamationComponent
    ],
    imports: [
        RouterModule.forChild(exampleRoutes),
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule // Add FormsModule here
    ]
})
export class AjouterReclamationModule { }
