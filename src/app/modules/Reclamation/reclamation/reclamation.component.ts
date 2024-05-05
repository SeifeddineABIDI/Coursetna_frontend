import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { Subscription, interval } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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
  reponseForm : FormGroup ; 
  reclam: any ;
  id : any ; 
  reponse : any ;
  private statsSubscription: Subscription;

  constructor(
    private listrec: ReclamationService,
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getByid(this.id); 
    this.getByidReclam(this.id); 
    this.reclamationForm = this.formBuilder.group({
      id: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      creationDate: ['', Validators.required],
      titre: ['', Validators.required],
    });
    this.reponseForm = this.formBuilder.group({
      id: ['', Validators.required],
      contenuRep: ['', Validators.required],
    });
    this.getallreclmation();
    this.fetchStatistics(); // Fetch statistics initially
    this.statsSubscription = interval(5000).subscribe(() => {
      this.fetchStatistics();
      this.id = this.activatedRoute.snapshot.params['id'];

      // Vérifier si l'ID est défini avant d'appeler getByid()
      if (this.id) {
          // Appeler getByid() seulement si l'ID est défini
          this.getByid(this.id);
      }
  
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
  getByidReclam(id: any) {
    this.listrec.getonereclamation(id).subscribe(
        (res: any) => {
            this.reclam = res; // Assurez-vous d'avoir une variable "reclam" dans votre composant pour stocker les détails de la réclamation
            console.log('Reclamation details:', this.reclam);
        },
        (error: any) => {
            console.error('Failed to fetch reclamation details:', error);
            // Handle the error
        }
    );
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
  getByid(id: any) {
    this.listrec.getonereclamation(id).subscribe(
        (res: any) => {
            this.reponse = res; // Assurez-vous d'avoir une variable "reclam" dans votre composant pour stocker les détails de la réclamation
            console.log('reponse details:', this.reponse);
        },
        (error: any) => {
            console.error('Failed to fetch reclamation details:', error);
            // Handle the error
        }
    );
}

  addReponse() {
    // Now add the response
    const rep = this.reponse.idrec ; 
    this.listrec.addreponse(this.reponseForm.value,rep).subscribe((res: any) => {
      console.log('Response added:', res);
      this.reponse = res;
      Swal.fire(
        'CONFIRMED !',
        'You answered to this reclamation, thank you.',
        'success'
      );
    });
  }
  
  
}
