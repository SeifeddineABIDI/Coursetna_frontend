import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { StageService } from '../services/stage.service';
import { Stage } from '../modals/stage';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  openDeleteStageModal(offreId: number) {
    this.currentStageId = offreId;
    $('#deleteStageModal').modal('show');
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
  
  openEditStageModal(stage: Stage) {
    this.modalTitle = 'Edit Stage'; 
    this.currentStage = stage;
  }
 
  openAddStageModal() {
  throw new Error('Method not implemented.');
  }
  submitStageForm() {
    // Implement your form submission logic here
    // For example, you can add or update the stage using StageService
  }

  openModal(): void {
    $('#myModal').modal('show'); // Show the modal using jQuery
  }
  closeModal(): void {
    $('#myModal').modal('hide'); // Hide the modal using jQuery
  }
  editStage(offreId: number): void {
    this.router.navigate(['/stage', offreId]);
  }
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
  
  
  onSubmit() {
    this.searchStages();
  }
  

  modalTitle: string = 'Add Stage'; 


  public stagesResults: Stage[] = [];

  constructor(private stageService: StageService,private router:Router) { }

  ngOnInit() {
    this.getStages(); 
    this.filteredStages = this.stagesResults;
  }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip(); // Activate tooltips

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
    // Clean up code (if any) when component is destroyed
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
