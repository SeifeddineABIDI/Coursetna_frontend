import { User } from "app/core/user/user.types";
import { Question } from "./question";

export class Reponse{
    numReponse?:number;
    selectedChoice?:string;
    
    user?:User;//ManyToOne
    question?:Question;//ManyToOne


    constructor(data?: any) {
        if (data) {
          this.numReponse = data.numReponse;
          this.selectedChoice = data.selectedChoice;
          this.user = data.user;
          this.question = data.question;
        }
    }
}