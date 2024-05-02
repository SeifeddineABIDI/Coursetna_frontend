import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Topic } from 'app/modules/Ressource/models/topic';
import { Reclamation } from '../models/Reclamation.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-reclamation',
  templateUrl: './ajouter-reclamation.component.html',
  styleUrls: ['./ajouter-reclamation.component.css']
})
export class AjouterReclamationComponent implements OnInit {
 /* reclamationTitle: string = '';
  reclamationDescription: string = '';
  reclamationTopic: string = '';*/
  topics : Topic[]=[] ; 
  reclamation : Reclamation[]=[] ; 
 //******************************************************************************* */
  userid: any;

  reclamationform:FormGroup
  topic=new FormControl('',Validators.required);
  constructor(private reclamationService: ReclamationService , private fb:FormBuilder, private router:Router) {
    this.reclamationform=this.fb.group({
      titre: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
   }
  ngOnInit(): void {
    this.getalltopic();
  }
  getalltopic() {
    this.reclamationService.alltopics().subscribe((res: any) => {
      this.topics = res;
      console.log('listettopics', this.topics);
    });
  }
  addreclamation() {
    const userid = 2;
    const selectedTopicId: number = parseInt(this.topic.value, 10); // interprets the string as a decimal number.    
        this.reclamationService.addReclamation(this.reclamationform.value, userid, selectedTopicId).subscribe(
          (result:any) => {
            console.log('mtaa swalll :' , result);
            Swal.fire({
              title: 'Added!',
              text: 'Your reclamation has been added successfully.',
              icon: 'success'
            }).then((result) => {
              // Check if the Swal promise is resolved
              console.log('Swal closed:', result);
              // Redirection vers une autre page après l'ajout de la réclamation
              this.router.navigate(['/reclamation']);
            });
          }
          
        );
      } 
  

}

