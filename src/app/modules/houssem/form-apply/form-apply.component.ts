import { Component, OnInit } from '@angular/core';
import { Stage } from '../modals/stage';
import { HttpErrorResponse } from '@angular/common/http';
import { StageService } from '../services/stage.service';




@Component({
  selector: 'app-form-apply',
  templateUrl: './form-apply.component.html',
  styleUrls: ['./form-apply.component.scss']
})
export class FormApplyComponent implements OnInit{

  public stagesResults: Stage[] = [];

  constructor(private stageService: StageService) { }




  ngOnInit() {
    this.getStages(); 
  }

  public getStages(): void {
    this.stageService.getStages().subscribe(
      (response: Stage[]) => {
        this.stagesResults = response;
        console.log(this.stagesResults);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching stages:', error);
      }
    );
  }




}
