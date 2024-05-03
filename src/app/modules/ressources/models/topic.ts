import { Ressource } from "./ressource";


export class Topic {

    id: number | undefined;
    nom: string | undefined;
    ContenuTopic: string | undefined;
    photo: string | undefined;
    ressources: Ressource[] | undefined;

    
  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.nom = data.nom;
      this.ContenuTopic = data.ContenuTopic;
      this.photo = data.photo;
      this.ressources = data.ressources;

    }

}
}