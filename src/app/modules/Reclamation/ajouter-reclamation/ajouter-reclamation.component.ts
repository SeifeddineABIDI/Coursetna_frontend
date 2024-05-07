import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reclamation } from '../models/Reclamation.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Topic } from 'app/modules/ressources/models/topic';

@Component({
  selector: 'app-ajouter-reclamation',
  templateUrl: './ajouter-reclamation.component.html',
  styleUrls: ['./ajouter-reclamation.component.css']
})
export class AjouterReclamationComponent implements OnInit {
  /* reclamationTitle: string = '';
   reclamationDescription: string = '';
   reclamationTopic: string = '';*/
  topics: Topic[] = [];
  reclamation: Reclamation[] = [];
  //******************************************************************************* */


  currentUser: any;


  reclamationform: FormGroup
  topic = new FormControl('', Validators.required);
  constructor(private reclamationService: ReclamationService, private fb: FormBuilder, private router: Router) {
    this.reclamationform = this.fb.group({
      titre: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));//recuperer l'utilisateur connecté
    this.getalltopic();
  }
  getalltopic() {
    this.reclamationService.alltopics().subscribe((res: any) => {
      this.topics = res;
      console.log('listettopics', this.topics);
    });
  }
  addreclamation() {
    const selectedTopicId: number = parseInt(this.topic.value, 10);
    this.reclamationService.addReclamation(this.reclamationform.value, this.currentUser.id, selectedTopicId).subscribe(
      (result: any) => {
        // Afficher une fenêtre modale de succès
        Swal.fire({
          title: 'Success!',
          text: 'Your reclamation has been added successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          // Rediriger vers une autre page ou faire d'autres actions après avoir cliqué sur OK
          if (result.isConfirmed) {
            // Redirection vers une autre page
            this.router.navigate(['/reclamation']);
          }
        });
      },
      (error: any) => {
        // Afficher une fenêtre modale d'erreur si l'ajout de la réclamation échoue
        Swal.fire({
          title: 'Success!',
          text: 'Your reclamation has been added successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        window.location.reload();

      }
    );
}
}




