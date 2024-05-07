import { Commentaire } from "./commentaire";
import { User } from "./user";
import { VersionRessource } from "./version-ressource";
import { Notification } from "./notification";
import { Categorie } from "./categorie";
import { Options } from "./options";
import { Topic } from "./topic";



export class Ressource {

  id: number | undefined;
  titre: string | undefined;
  description: string | undefined;
  typeFichier: string | undefined;
  tailleFichier: number | undefined;
  categorie: Categorie | undefined;
  dateTlg: Date | undefined;
  auteur: User | undefined;
  rating: number | undefined;
  filePath: string| undefined;
  options: Options |undefined; 
  notifications: Notification[] | undefined;
  versions: VersionRessource[] | undefined;
  commentaires: Commentaire[] | undefined;
  topic: Topic | undefined; 
  archived: boolean | undefined;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.titre = data.titre;
      this.description = data.description;
      this.typeFichier = data.typeFichier;
      this.tailleFichier = data.tailleFichier;
      this.categorie = data.categorie;
      this.options = data.options;
      this.dateTlg = new Date(data.dateTlg);
      this.auteur = data.auteur;
      this.notifications = data.notifications;
      this.versions = data.versions;
      this.rating = data.rating;
      this.filePath = data.filePath;
      this.topic = data.topic;
      this.archived = data.archived;

    }
}




  


}
