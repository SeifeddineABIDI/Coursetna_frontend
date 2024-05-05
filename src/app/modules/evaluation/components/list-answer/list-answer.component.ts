import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../../models/answer';
import { AnswerService } from '../../services/answer.service';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-list-answer',
  templateUrl: './list-answer.component.html',
  styleUrls: ['./list-answer.component.css']
})
export class ListAnswerComponent {
  currentUser: any; 
  answers: Answer[] = [];
  quiz:Quiz ;

  constructor(
    private Act: ActivatedRoute,
    private as: AnswerService,
    private qs: QuizService,
  ){ }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));//recuperer l'utilisateur connecté
    const quizId = this.Act.snapshot.params['id'];

    this.getQuiz(quizId);

    this.as.getAnswersByUserAndQuiz(quizId, this.currentUser.id).subscribe({
      next: (data) => {
        this.answers = data;
      },
      error: (err) => {
        console.error('Error fetching answers:', err);
      }
    });

  }

  getQuiz(numQuizz:number){
    this.qs.getQuizById(numQuizz).subscribe({
      next: (data) => {
        this.quiz = data;
      }
    });
  }

}
