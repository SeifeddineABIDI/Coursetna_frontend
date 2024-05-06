import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { StageService } from '../services/stage.service';
import { Stage } from '../modals/stage';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';
declare var $: any;

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss']
})
export class InternshipsComponent implements OnInit, AfterViewInit, OnDestroy {

  totalStages: any;
  currentStage: Stage | undefined;
  currentStageId!: number;
  titreFilter: string = '';
  filteredStages: Stage []=[];

  modalTitle: string = 'Add Stage'; 

  public stagesResults: Stage[] = [];

  constructor(private stageService: StageService,private router:Router,private sharedService: SharedService) { }

  /*likeStage(stage: Stage) {
    stage.liked = true;
    stage.disliked = false;
  }
  
  dislikeStage(stage: Stage) {
    stage.liked = false;
    stage.disliked = true;
  }
  

  toggleLike(stage: Stage) {
    if (stage.liked) {
      stage.liked = false;
    } else {
      stage.liked = true;
      stage.disliked = false; // Make sure only one button is active at a time
    }
  }
  
  toggleDislike(stage: Stage) {
    if (stage.disliked) {
      stage.disliked = false;
    } else {
      stage.disliked = true;
      stage.liked = false; // Make sure only one button is active at a time
    }
  }

  toggleFavorite(stage: Stage) {
    stage.favorite = !stage.favorite;
  }
 */
  // searchStagesByTitle(): void {
  //   const searchQuery = this.titreFilter.trim().toUpperCase();
  //   if (searchQuery) {
  //     this.totalStages = this.stagesResults.filter(stage => {
  //       if (stage.title) {
  //         return stage.title.toUpperCase().includes(searchQuery);
  //       } else {
  //         return false;
  //       }
  //     });
  //   } else {
  //     this.totalStages = this.stagesResults;
  //   }
  // }
  getStages(): void {
    this.stageService.getStages().subscribe(
      (response: Stage[]) => {
        this.stagesResults = response;
        this.filteredStages = this.stagesResults;
        this.totalStages = this.stagesResults.length; 
        console.log(this.stagesResults);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching stages:', error);
      }
    );
  }

  cancelSearch() {
    this.filteredStages = this.stagesResults; // Restore the original stages list
    this.totalStages = this.filteredStages.length;
  }

  searchStages() {
    if (this.titreFilter.trim() === '') {   
      this.filteredStages = this.stagesResults;
    } else {
      const searchQuery = this.titreFilter.trim().toLowerCase();
      this.filteredStages = this.stagesResults.filter(stage =>
        stage.title.toLowerCase().includes(searchQuery)
      );
    }
  }

  deleteStageConfirmed() {
    if (this.currentStageId) {
      this.stageService.deleteStage(this.currentStageId).subscribe(
        () => {
          console.log('Stage deleted successfully');
          this.getStages(); // Refresh stages after deletion
          $('#deleteStageModal').modal('hide');
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting stage:', error);
          alert('Failed to delete stage. Please try again.');
        }
      );
    }
  }

  onDeleteStage(offreId: number): void {
    this.stageService.deleteStage(offreId)
      .subscribe(() => {
        console:console.log("this is the id for this stqge :", offreId);
        
        // Remove the deleted stage from the list
        console.log("Stage deleted successfully");

        this.stagesResults = this.stagesResults.filter(stage => stage.offreid !== offreId);
        this.totalStages = this.stagesResults.length;
      });
  }

  reloadPage() {
    window.location.reload();
 }
 
  
  submitStageForm() {
    // Implement your form submission logic here
    // For example, you can add or update the stage using StageService
  }

  openEditModal(offreId: number): void {
    this.sharedService.changeOffreId(offreId);
    $('#myModalForEdit').modal('show');
  }
  
  closeEditModal(): void {
    $('#myModalForEdit').modal('hide');
  }

  openModal(): void {
    $('#myModal').modal('show'); // Show the modal using jQuery
  }
  closeModal(): void {
    $('#myModal').modal('hide'); // Hide the modal using jQuery
  }
  
  
  onSubmit() {
    this.searchStages();
  }
  
  ngOnInit() {
    this.getStages();
  }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();

    const checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(() => {
      checkbox.prop('checked', $("#selectAll").prop('checked'));
    });

    checkbox.click(() => {
      if (!checkbox.filter(':checked').length) {
        $("#selectAll").prop("checked", false);
      }
    });
  }

  ngOnDestroy() {
  }

  /*public onDeleteStage(stageId: number): void {
    this.stageService.deleteStage(stageId).subscribe(
      (response: void) => {
        console.log('Stage deleted successfully:', response);
        this.getStages(); // Refresh stages after deletion
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting stage:', error);
        alert('Failed to delete stage. Please try again.');
      }
    );
  }*/
}
