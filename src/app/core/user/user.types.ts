import { Score } from "app/modules/evaluation/models/score";
import { Role } from "./role";
import { Commentaire } from "app/modules/ressources/models/commentaire";
import { Ressource } from "app/modules/ressources/models/ressource";
import { Notification } from "app/modules/ressources/models/notification";
import { Reclamation } from "app/modules/Reclamation/models/Reclamation.models";

export interface User
{
    id: number;
    name: string;
    nom?: string;
    prenom?: string;
    email?: string;
    role: Role
    photo?: string;
    avatar?: string;
    status?: string;
    access_token?: string;
    refresh_token?: string;
    /******evaluation**** */
    listScore?:Score[];
    /******ressource***** */
    listCommentaires?:Commentaire[];
    listRessourcesPubliees?:Ressource[];
    listNotifications?:Notification[];
    /******reclamation***** */
    listReclamtions?:Reclamation[];
    /*********************** */


}
export class User {
    static currentUser: User | null = null;
}