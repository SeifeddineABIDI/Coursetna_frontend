import { Ressource } from "./ressource";
import { User } from "./user";

export class Commentaire {
  idCommentaire?: number ;
  contenu?: string|undefined;
  datePublication?: Date;
  likes?: number;
  dislikes?: number;
  emotion?: string;
  auteur?: User;
  ressource?: Ressource;

  constructor(data?: any) {
    if (data) {
      this.idCommentaire = data.idCommentaire;
      this.contenu = data.contenu;
      this.likes = data.likes;
      this.dislikes = data.dislikes;
      this.emotion = data.emotion;
      this.datePublication = data.datePublication ? new Date(data.datePublication) : undefined;
       this.auteur = data.auteur || [];
      this.ressource = data.ressources || [];
    }
  }
}



