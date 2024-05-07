import { Component } from '@angular/core';
import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent {
  newTopic: Topic = new Topic();
  selectedFile: File | undefined;

  constructor(private http: HttpClient,private router:Router,private topicservice:TopicService) {}
  ajouterTopic() {
    this.topicservice.verifierNomDeSujet(this.newTopic.nom!).subscribe(
      (existeDeja) => {
        if (existeDeja) {
   
          Swal.fire({
            title: 'Sujet existant',
            text: 'Ce sujet existe déjà. Veuillez en choisir un autre.',
            icon: 'warning'
          });
        } else {
          const formData: FormData = new FormData();
          formData.append('photo', this.selectedFile!);
          formData.append('nom', this.newTopic.nom!);
          formData.append('ContenuTopic', this.newTopic.ContenuTopic!);
  
          this.http.post<any>('http://localhost:9000/pidev/topic/addTopic', formData)
            .subscribe(
              (response) => {
                console.log('Sujet ajouté avec succès !', response);
                this.router.navigate(['/add']);
              },
              (error) => {
                console.error('Erreur lors de l\'ajout du sujet :', error);
              }
            );
        }
      },
      (error) => {
        console.error('Erreur lors de la vérification de l\'existence du sujet :', error);
      }
    );
  }
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
