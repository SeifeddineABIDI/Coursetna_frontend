import { Quiz } from "./quiz";

export class Question{
    numQuestion?:number;
    question?:string;
    choice1?:string;
    choice2?:string;
    choice3?:string;
    correctAnswer?:string;
    points?:number;

    quiz?:Quiz;//ManyToOne

    constructor(data?: any) {
        if (data) {
          this.numQuestion = data.numQuestion;
          this.question = data.question;
          this.choice1 = data.choice1;
          this.choice2 = data.choice2;
          this.choice3 = data.choice3;
          this.correctAnswer = data.correctAnswer;
          this.points = data.points;
          this.quiz = data.quiz;
        }
    }
}