import { Component, Input, OnInit } from '@angular/core';
import { Stage } from '../modals/stage';
import { StageService } from '../services/stage.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  stageToUpdate: Stage = {} as Stage;
  offreId: number | null = null;

  errorMessage: string | undefined;
  successMessage: string | undefined;

  constructor(private route: ActivatedRoute,private stageservice: StageService,private sharedService: SharedService) {}
  openModal(): void {
    $('#myModalForEdit').modal('show');
  }

  closeModal(): void {
    $('#myModalForEdit').modal('hide');
  }

  ngOnInit(): void {
    this.sharedService.currentOffreId.subscribe(id => {
      if (id !== null) {
        this.offreId = id;
        this.loadStageToUpdate(this.offreId);
      }
    });
  }

  loadStageToUpdate(offreId: number): void {
    this.stageservice.getStageById(offreId)
      .subscribe(
        (stage: Stage) => {
          this.stageToUpdate = stage;
        },
        (error: any) => {
          console.error('Error loading stage to update:', error);
          this.errorMessage = 'Failed to load stage to update.';
        }
      );
  }

  updateStage(): void {
    if (this.stageToUpdate) {
      this.stageservice.updateStage(this.stageToUpdate)
        .subscribe(
          (updatedStage: Stage) => {
            this.successMessage = 'Stage updated successfully.';
            window.location.reload();
            
            $('#myModalForEdit').modal('hide');
          },
          (error: any) => {
            console.error('Error updating stage:', error);
            this.errorMessage = 'Failed to update stage.';
          }
        );
    }
  }
  
}