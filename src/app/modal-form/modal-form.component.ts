import { Component, OnInit } from '@angular/core';
import { StageService } from '../services/stage.service';
import { Stage } from '../modals/stage';
declare var $: any;

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
 modalStage: Stage = {} as Stage;

  constructor(private stageService: StageService) { }

  ngOnInit(): void {
  }

  openModal(): void {
    $('#myModal').modal('show');
  }

  closeModal(): void {
    $('#myModal').modal('hide');
  }

  submitForm(): void {
    this.stageService.addStage(this.modalStage).subscribe(
      (response: Stage) => {
        console.log('Stage added successfully:', response);
        // Optionally, you can reset the modalStage object to clear the form fields
       this.modalStage = {} as Stage;
        // Close the modal after adding the stage
        this.closeModal();
        this.reloadPage()
      },
      (error) => {
        console.error('Error adding stage:', error);
        // Handle the error as needed
      }
    );
  }
  reloadPage() {
    window.location.reload();
 }
}
