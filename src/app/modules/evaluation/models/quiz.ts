import { Question } from "./question";
import { Score } from "./score";

// export interface ApiResponse<T> {
//   message?: string;
//   data: T;
// }

export interface Quiz{
    numQuiz?:number;
    title?:string;
    description?:string;
    duree?:number;
    status?:boolean; // true = published, false = draft
    listQuestion?:Question[];//relation OneToMany
    listScore?:Score[];//relation OneToMany
}