import { Component, OnInit } from '@angular/core';
import { Stage } from '../modals/stage';
import { StageService } from '../services/stage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  stageToUpdate: Stage |undefined;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  offreId: number | null = null;

  constructor(private route: ActivatedRoute, private stageservice: StageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.offreId = Number(id);
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
    this.stageservice.updateStage(this.stageToUpdate!)
      .subscribe(
        (updatedStage: Stage) => {
          this.successMessage = 'Stage updated successfully.';

      this.reloadPage();
      window.location.href = '/list';
          //this.reloadPage();
        },
        (error: any) => {
          console.error('Error updating stage:', error);
          this.errorMessage = 'Failed to update stage.';
        }
      );
  }
  reloadPage() {
    window.location.reload();
 }
}
