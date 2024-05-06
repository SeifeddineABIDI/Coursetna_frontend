import { Component, OnInit } from '@angular/core';
import { StageService } from '../services/stage.service';
import { Stage } from '../modals/stage';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
declare var $: any;



@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  stages: Stage[] = [];
  //seuilDislikes: number = 2;
  totalStages: number | undefined;

  constructor(
    private router: Router,
    private stageService: StageService,
    //private commentaireService: CommentaireService
  ) { }

  ngOnInit(): void {
    this.getStages();

  }

  getStages(): void {
    this.stageService.getStages().subscribe(
      (response: Stage[]) => {
        this.stages = response;
        this.totalStages = this.stages.length; 
        console.log(this.stages);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching stages:', error);
      }
    );
  }
  
  /*getCommentsByActualiteId(actualiteId: number): void {
    this.commentaireService.getAllCommentsByActualiteId(actualiteId)
      .subscribe(commentaires => {
        this.commentaires = commentaires;
  
      });
  }

  ajouterCommentaire(actualite: Actualites): void {
    this.router.navigate(['/AjoutCommentaire', actualite.id]);
  }

  editActualite(actualite: Actualites): void {
    this.router.navigate(['/edit-actualite', actualite.id]);
  }

  likeCommentaire(commentaireId: number): void {
    this.commentaireService.incrementerLikes(commentaireId)
      .subscribe(() => {
        // Mettre à jour les commentaires après l'incrémentation des likes
        this.getCommentsByActualiteId(this.actualites[0].id);
      });
  }

  dislikeCommentaire(commentaireId: number): void {
    this.commentaireService.incrementerDislikes(commentaireId)
      .subscribe(() => {
        // Après l'incrémentation des dislikes, vérifiez si le commentaire doit être signalé
        this.commentaireService.getCommentaireById(commentaireId)
          .subscribe(commentaire => {
            if (commentaire.nombreDislikes > this.seuilDislikes) {
              // Si le nombre de dislikes dépasse le seuil, signalez le commentaire
              this.commentaireService.signalerCommentaire(commentaireId)
                .subscribe(
                  () => {
                    console.log('Commentaire signalé automatiquement : ', commentaireId);
                    // Mettez à jour la liste des commentaires après le signalement
                    this.getCommentsByActualiteId(this.actualites[0].id);
                  },
                  error => {
                    console.error('Erreur lors du signalement automatique du commentaire : ', error);
                  }
                );
            }
          });
      });
  }*/
}
  

  
  



