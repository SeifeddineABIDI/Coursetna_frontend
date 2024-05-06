import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { InternshipsComponent } from './internships/internships.component';
import { ApplyComponent } from './apply/apply.component';


const routes: Routes = [
  
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'stage/:id', component: EditComponent },
  { path: 'list', component: InternshipsComponent },
  { path: 'apply', component: ApplyComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
