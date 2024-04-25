import { Quiz } from "app/modules/evaluation/models/quiz";

export interface Topic{
    id?:number;
    nom?:string;
    contenuTopic?:string;
    photo?:string;

    listQuiz?:Quiz[];//relation OneToMany
}