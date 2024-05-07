import { Commentaire } from "./commentaire";
import { Ressource } from "./ressource";
import { Notification } from "./notification";
import { TypeUser } from "./TypeUser";


export class User {

  id?: number;
  nom: string | undefined;
  prenom: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role: TypeUser | undefined;
  photo: string | undefined;
  ressourcesPubliees?: Ressource[];
  notifications?: Notification[];
  commentaires?: Commentaire[];
}
