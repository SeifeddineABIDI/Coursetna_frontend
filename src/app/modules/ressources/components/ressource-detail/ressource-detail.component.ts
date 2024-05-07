import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { CommentaireService } from '../../services/commentaire.service';
import { Commentaire } from '../../models/commentaire';
import { User } from '../../models/user';
import { TypeUser } from '../../models/TypeUser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ressource-detail',
  templateUrl: './ressource-detail.component.html',
  styleUrls: ['./ressource-detail.component.css']
})
export class RessourceDetailComponent implements OnInit {
  @ViewChild('commentairesContainer') commentairesContainer!: ElementRef;
  id: number | null = null; 
  resourceDetails: any; 
  commentaires: Commentaire[] = [];
  nouveauCommentaire: string = '';
  userId: number = 1; 
  likes:number|null = null;
  afficherTousLesCommentaires: boolean = false;
  afficherEmojis: boolean = false; 
  emojis: string[] = ['😊', '❤️', '👍', '😂', '😍', '😎', '🥰', '🎉', '🔥', '🤗', '😇', '🎁','🌹','🎂','🤳','😃','✨','✔'];
  sendButtonEnabled: boolean = false;
  scrollBarVisible: boolean = false;
  nombreCommentaires: number = 0;

  

  constructor(private route: ActivatedRoute, private resourceService: ResourceService,private commentaireService: CommentaireService) { }
  isCommentaireVide(): boolean {
    return this.nouveauCommentaire.trim() === '';
  }
  getNombreTotalCommentaires(): number {
    return this.commentaires ? this.commentaires.length : 0;
  }
  
  ajouterCommentaire() {
    if (this.isCommentaireVide()) {
      console.error('Le commentaire est vide.');
      return;
    }
  
    if (this.id !== null && this.id !== undefined && this.userId !== undefined) {
      this.resourceService.getRessourceById(this.id).subscribe(
        (resource) => {
          const auteur: User = {
            id: this.userId,
            nom: 'Nom de l\'utilisateur',
            prenom: 'Prénom de l\'utilisateur',
            email: 'email@example.com',
            password: 'motdepasse',
            role: "Admin" as TypeUser,
            photo: 'hahha'
          };
          const commentaire: Commentaire = {
            contenu: this.nouveauCommentaire,
            ressource: resource,
            auteur: auteur,
          };
          this.commentaireService.addCommentaire(commentaire).subscribe(
            (resultat) => {
              if (this.id !== null && this.id !== undefined) {
                this.navigateToRessourceDetail(this.id);
                this.loadCommentaires(this.id);
              } else {
                console.error('L\'ID de la ressource est null ou non défini.');
              }
              this.nouveauCommentaire = '';
            },
            (erreur) => {
              console.error('Erreur lors de l\'ajout du commentaire : ', erreur);
              if (erreur && erreur.error && erreur.error.includes("Profanity exists")) {
                Swal.fire({
                  title: 'Commentaire inapproprié détecté',
                  text: 'Votre commentaire contient des mots inappropriés. Veuillez reformuler votre commentaire.',
                  icon: 'warning'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.nouveauCommentaire = ''; 
                  }
                });  
              }
            }            
          );
        },
        (erreur) => {
          console.error('Erreur lors de la récupération de la ressource : ', erreur);
        }
      );
    } else {
      console.error('L\'ID de la ressource est null ou non défini.');
    }
  }
  navigateToRessourceDetail(id: number): void {
    window.location.href = `/ressource/${id}`
  }
  ajouterEmoji(emoji: string): void {
    this.nouveauCommentaire += emoji;
  }
    
  toggleAfficherEmojis(): void {
    this.afficherEmojis = !this.afficherEmojis;
  }

  loadCommentaires(id: number): void {
    this.commentaireService.getCommentairesByRessourceId(id).subscribe(
      (commentaires) => {
        commentaires = commentaires.filter(commentaire => commentaire.datePublication);
        commentaires.sort((a, b) => {
          return new Date(b.datePublication!).getTime() - new Date(a.datePublication!).getTime();
        });
           if (!this.afficherTousLesCommentaires) {
          this.commentaires = commentaires.slice(0, 5); 
        } else {
          this.commentaires = commentaires;
        }
        console.log('Commentaires récupérés avec succès : ', this.commentaires);
      },
      (erreur) => {
        console.error('Erreur lors du chargement des commentaires : ', erreur);
      }
    );
  }
  
  afficherPlusDeCommentaires(): void {
    this.afficherTousLesCommentaires = true;
    this.scrollBarVisible = true; 
    if (this.id !== null && this.id !== undefined) {
      this.loadCommentaires(this.id);
    } else {
      console.error('L\'ID de la ressource est null ou non défini.');
    }
  }
  
  
  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = parseInt(id, 10); 
        this.loadResourceDetails(this.id);
        this.loadCommentaires(this.id); 
        this.getNombreCommentaires(); 
      }
    });
  }
  getNombreCommentaires(): void {
    if (this.id !== null) {
      this.commentaireService.getNombreCommentairesByRessourceId(this.id).subscribe(
        (nombre) => {
          this.nombreCommentaires = nombre;
        },
        (erreur) => {
          console.error('Erreur lors de la récupération du nombre de commentaires : ', erreur);
        }
      );
    } else {
      console.error('La variable id est null.');
    }
  }
  
  
  dislikeCommentaire(commentaire: Commentaire): void {
    if (commentaire.idCommentaire !== undefined) {
      this.commentaireService.ajouterDislike(commentaire.idCommentaire).subscribe(
        () => {
          if (commentaire.dislikes !== undefined) {
            commentaire.dislikes = (commentaire.dislikes || 0) + 1;
          } else {
            commentaire.dislikes = 1;
          }
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du dislike : ', error);
        }
      );
    } else {
      console.error('ID du commentaire non défini.');
    }
  }
  
  likeCommentaire(commentaire: Commentaire): void {
    if (commentaire.idCommentaire !== undefined) {
        console.log('ID du commentaire:', commentaire.idCommentaire);
        if (!this.aDejaLike(commentaire)) {
            console.log('L\'utilisateur n\'a pas encore liké ce commentaire.');
            this.commentaireService.ajouterLike(commentaire.idCommentaire).subscribe(
                () => {
                    commentaire.likes = (commentaire.likes || 0) + 1;
                    console.log('Like ajouté avec succès. Nombre de likes actuel:', commentaire.likes);
                },
                (error) => {
                    console.error('Erreur lors de l\'ajout du like : ', error);
                }
            );
        } else {
            console.log('L\'utilisateur a déjà aimé ce commentaire.');
        }
    } else {
        console.error('ID du commentaire non défini.');
    }
}

  
  supprimerLike(commentaireId: number): void {
    this.commentaireService.supprimerLike(commentaireId).subscribe(
      () => {
        console.log('Like supprimé avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression du like : ', error);
      }
    );
  }
  supprimerdislike(commentaireId: number): void {
    this.commentaireService.supprimerDislike(commentaireId).subscribe(
      () => {
        console.log('Like supprimé avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression du like : ', error);
      }
    );
  }
  aDejaLike(commentaire: Commentaire): boolean {
    return Array.isArray(commentaire.likes) && commentaire.likes.includes(this.userId);
}

  
  loadResourceDetails(id: number): void { 
    this.resourceService.getRessourceById(id).subscribe(
      (data: any) => {
        this.resourceDetails = data;
        // this.rating = data.rating; 

      },
      (error: any) => {
        console.error('Error loading resource details:', error);
      }
    );
    
  }
  telechargerFichier(id: number) {
    this.resourceService.telechargerFichier(id).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Erreur lors du téléchargement du fichier :', error);
      }
    );
  }


}  