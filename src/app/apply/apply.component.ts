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
  totalStages: number | undefined;
  isFileUploaded = true;
  filesSent: boolean[] = []; // Un tableau pour suivre les fichiers envoyés pour chaque stage

  constructor(
    private router: Router,
    private stageService: StageService,
  ) { }

  ngOnInit(): void {
    this.getStages();
  }

  getStages(): void {
    this.stageService.getStages().subscribe(
      (response: Stage[]) => {
        this.stages = response;
        this.totalStages = this.stages.length;
        this.filesSent = new Array(this.stages.length).fill(false); // Initialiser le tableau avec des valeurs false
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching stages:', error);
      }
    );
  }


  sendFile(index: number) {
    console.log('Fichier envoyé pour le stage', index);
    this.filesSent[index] = true;
  
    setTimeout(() => {
      this.filesSent[index] = false;
      this.router.navigate(['/list']); 
    }, 3000);
  }
  


  onFileChanged(event: any): void {
    const file = event.target.files[0];
    // Perform operations with the file here
  }


  goToList() {
    this.router.navigate(['/list']);
    }





  
}