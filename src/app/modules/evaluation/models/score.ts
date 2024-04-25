import { User } from "app/core/user/user.types";
import { Quiz } from "./quiz";

export class Score{
    numScore?:number;
    score?:number;
    dateTime?:Date;
    duration?:number;

    user?:User;//ManyToOne
    quiz?:Quiz;//ManyToOne

    constructor(data?: any) {
        if (data) {
          this.numScore = data.numScore;
          this.score = data.score;
          this.dateTime = data.dateTime?new Date(data.dateTime):undefined;
          this.duration = data.duration;
          this.user = data.user;
          this.quiz = data.quiz;
        }
    }
}