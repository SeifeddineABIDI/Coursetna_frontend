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
  stages: Stage[] = [];
  //seuilDislikes: number = 2;
  totalStages: number | undefined;

  constructor(
    private router: Router,
    private stageService: StageService,
    //private commentaireService: CommentaireService
  ) { }

  ngOnInit(): void {
    this.getStages();

  }

  getStages(): void {
    this.stageService.getStages().subscribe(
      (response: Stage[]) => {
        this.stages = response;
        this.totalStages = this.stages.length; 
        console.log(this.stages);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching stages:', error);
      }
    );
  }
  
 
  onFileChanged(event: any): void {
    const file = event.target.files[0];
    // Perform operations with the file here
  }
 
}
  

  
  



