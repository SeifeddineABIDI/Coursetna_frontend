import { Component, OnInit } from '@angular/core';
import { StageService } from '../services/stage.service';
import { Stage } from '../modals/stage';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
declare var $: any;



@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  totalStages: any;
  currentStage: Stage | undefined;
  currentStageId!: number;
  titreFilter: string = '';
  filteredStages: Stage []=[];

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



  
  



