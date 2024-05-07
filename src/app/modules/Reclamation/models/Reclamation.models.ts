// models.ts

import { User } from "app/core/user/user.types";
import { Reponse } from "./Reponse.models";
import { Topic } from "app/modules/ressources/models/topic";

export interface Reclamation {
  idrec: number;
  titre: string;
  description: string;
  creationDate: string; // Assuming you're using ISO format string for dates
  status: TypeStatus;
  user: User;
  responses: Reponse;
  topic: Topic;
}

export enum TypeStatus {
  non_traite = 'non_traite',
  traite = 'traite'
}


