import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternshipsComponent } from './internships/internships.component';
import { StageService } from './services/stage.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalFormComponent } from './modal-form/modal-form.component';

import { EditComponent } from './edit/edit.component';
import { ApplyComponent } from './apply/apply.component';
@NgModule({
  declarations: [
    AppComponent,
    InternshipsComponent,
    ModalFormComponent,
    EditComponent,
    ApplyComponent
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [StageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
