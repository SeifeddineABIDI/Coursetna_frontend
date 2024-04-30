import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { Subscription, interval } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css'],
})
export class ReclamationComponent implements OnInit, OnDestroy {
  listreclamation: any;
  reclamationsTraitees: number = 0;
  reclamationsNonTraitees: number = 0;
  reclamationForm: FormGroup;
  private statsSubscription: Subscription;

  constructor(
    private listrec: ReclamationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reclamationForm = this.formBuilder.group({
      id: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      creationDate: ['', Validators.required],
      titre: ['', Validators.required],
    });
    this.getallreclmation();
    this.fetchStatistics(); // Fetch statistics initially
    // Fetch statistics every 5 seconds
    this.statsSubscription = interval(5000).subscribe(() => {
      this.fetchStatistics();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the interval timer to prevent memory leaks
    if (this.statsSubscription) {
      this.statsSubscription.unsubscribe();
    }
  }

  getallreclmation() {
    this.listrec.allreclamation().subscribe((res: any) => {
      this.listreclamation = res;
      console.log('liste', this.listreclamation);
    });
  }

  deleteReclamation(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.listrec.deletereclamation(id).subscribe((res: any) => {
          console.log('Forum supprimé avec succès');
          this.getallreclmation();
          Swal.fire('Deleted!', 'this forum has been deleted.', 'success');
          // Recharger la page après la suppression
          this.reloadPage();
        });
      }
    });
  }

  reloadPage() {
    window.location.reload();
  }

  fetchStatistics() {
    this.listrec.stats().subscribe(
      (response: any) => {
        console.log('Received response:', response);
        // Extract statistics from the response text
        const statsText = response;
        const statsArray = statsText.split(','); // Split by comma
        // Extract treated and untreated reclamations from the array
        const treatedStats = statsArray.find((stat) =>
          stat.includes('traitées')
        );
        const untreatedStats = statsArray.find((stat) =>
          stat.includes('non traitées')
        );
        // Extract numerical values from the strings
        this.reclamationsTraitees = parseInt(
          treatedStats.split(':')[1].trim(),
          10
        );
        this.reclamationsNonTraitees = parseInt(
          untreatedStats.split(':')[1].trim(),
          10
        );
      },
      (error) => {
        console.error('Failed to fetch statistics:', error);
      }
    );
  }
}
