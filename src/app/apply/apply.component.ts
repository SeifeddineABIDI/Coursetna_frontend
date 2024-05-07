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
  isFileSent = false; // Ajouter cette ligne

  constructor(
    private router: Router,
    private stageService: StageService,
  ) { }

  ngOnInit(): void {
    this.getStages();
  }

  goToList() {
    this.router.navigate(['/list']);
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

  sendFile() {
    // Logique pour envoyer le fichier
    console.log('Fichier envoyé!');
    this.isFileSent = true; // Mettre à jour l'indicateur après l'envoi du fichier
    setTimeout(() => this.isFileSent = false, 3000); // Optionnel: Réinitialiser l'indicateur après 3 secondes
  }
}
