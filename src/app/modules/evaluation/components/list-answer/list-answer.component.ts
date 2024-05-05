import { Component } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Answer } from '../../models/answer';
import { AnswerService } from '../../services/answer.service';
import Swal from 'sweetalert2';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score';

@Component({
  selector: 'app-list-answer',
  templateUrl: './list-answer.component.html',
  styleUrls: ['./list-answer.component.css']
})
export class ListAnswerComponent {
  currentUser: any; 
  answers: Answer[] = [];

  constructor(
    private Act: ActivatedRoute,
    private as: AnswerService,
  ){ }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));//recuperer l'utilisateur connecté
    const quizId = this.Act.snapshot.params['id'];

    this.as.getAnswersByUserAndQuiz(quizId, this.currentUser.id).subscribe({
      next: (data) => {
        this.answers = data;
      },
      error: (err) => {
        console.error('Error fetching answers:', err);
      }
    });

  }


}
