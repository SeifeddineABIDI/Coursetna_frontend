import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { StatService } from '../../services/stat.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent {

totalQuizzes: number;
averageScore: number;
percentageCorrectAnswers: number;

  constructor(private quizService: QuizService,private statService: StatService){
  }

  ngOnInit(): void {
    this.quizService.getAllQuiz().subscribe(
      (data) =>{
        console.log("Got the list of all quizzes");
        this.totalQuizzes=data.length;}
    );

    this.statService.getAverageScore().subscribe(
      (data) =>{
        this.averageScore=data;}
    );

    this.statService.getPercentageCorrectAnswers().subscribe(
      (data) =>{
        this.percentageCorrectAnswers=data;}
    );



  }

/**************************** */
}
