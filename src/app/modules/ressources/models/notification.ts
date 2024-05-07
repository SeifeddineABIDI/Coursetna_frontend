import { Commentaire } from "./commentaire";
import { Ressource } from "./ressource";
import { User } from "./user";
import { TypeNotif } from "./typenotif";

export class Notification {

  idNotif?: number;
  contenu: string | undefined;
  dateEnvoi: Date | undefined;
  destinataire: User | undefined;
  estLue: boolean | undefined;
  ressource?: Ressource;
  commentaire?: Commentaire;
  type: TypeNotif | undefined;

  constructor(data?: any) {
    if (data) {
      this.idNotif = data.idNotif;
      this.contenu = data.contenu;
      this.estLue = data.estLue;
      this.dateEnvoi = data.dateEnvoi ? new Date(data.dateEnvoi) : undefined;
      this.ressource = data.ressource;
      this.ressource = data.ressource;
      this.type = data.type;
    }
}

}

