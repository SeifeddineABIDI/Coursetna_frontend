import { Component } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Answer } from '../../models/answer';
import { AnswerService } from '../../services/answer.service';
import { concat } from 'rxjs';
import Swal from 'sweetalert2';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  questions: Question[] =[];
  id!:number;

  timer: any;
  timeRemaining: number;

  quizForm: FormGroup; 
  
  constructor(
    private qs:QuestionService,
    private Act: ActivatedRoute,
    private qzs:QuizService,
    private formBuilder: FormBuilder,
    private router: Router,
    private as: AnswerService,
    private ss: ScoreService
  ){
    this.quizForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.id = this.Act.snapshot.params['id'];
    this.getAll(this.id);
    this.getQuizDuration(this.id);
  }
/*********validators form**** */
radioButtonValidator(control: AbstractControl): { [key: string]: any } | null {
  const selectedOptions = Object.values(control.value);
  if (selectedOptions.includes('')) {
    return { 'required': true };
  } else {
    return null;
  }
}

initForm(): void {
  this.questions.forEach((question, index) => {
    this.quizForm.addControl(`selectedOption_${index}`, this.formBuilder.control('', Validators.required));
  });
}
/***********timer********** */
getQuizDuration(quizId: number): void {
  this.qzs.getDureeByQuiz(quizId).subscribe(
    duration => {
      this.timeRemaining=duration*60;// Stocke la durée du quiz dans la variable quizDuration
      console.log('Quiz duration:', this.timeRemaining); // Affiche la durée du quiz dans la console
      this.startTimer(); // Appel de startTimer après avoir obtenu la durée du quiz
    },
    error => {
      console.error('Error fetching quiz duration:', error);
    }
  );
}

startTimer(): void {
  this.timer = setInterval(() => {
    this.timeRemaining--;
    if (this.timeRemaining <= 0) {
      clearInterval(this.timer);
      alert('Quiz time is up!');
      // Implement code to close the quiz or navigate away
      this.saveQuiz();
    }
  }, 1000); // Update every second
}
formatTime(seconds: number): string {
  const mins: string = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs: string = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}
/******end timer************* */
/*********getAll********************* */
getAll(id: number): void {
  this.qs.getAllQuestions(id).subscribe({
    next: (data) => {
      this.questions = data;
      this.initForm();
    },
    error: (err) => console.error(err),
    complete: () => console.log('getAll() done')
  });
}
/*******save Quiz*********** */
saveQuiz(): void {
  clearTimeout(this.timer);

  for (let i = 0; i < this.questions.length; i++) {
    const selectedOption = this.quizForm.get(`selectedOption_${i}`).value;
    const questionId = this.questions[i].numQuestion;
    const rep: Answer = { selectedChoice: selectedOption };

    this.addReponse(rep, questionId, 2);
  }
  Swal.fire({
    icon: 'success',
    title: 'Quiz added successfully!',
    showConfirmButton: false,
    timer: 1500
  }).then(() => {
    this.calculScore(this.id,2); //calcule score
    this.router.navigate(['/quizList']);
  });
  console.log('Quiz saved!');

}

addReponse(reponse: Answer, questionId: number, userId: number): void {
  this.as.addReponseAndAssignToQuestionAndUser(reponse, questionId,userId).subscribe(
      (result) => {
        console.log('answer added and assigned to Question And User successfully:', result);
      },
      (error) => {
        console.error('Error occurred while adding answer :', error);
      }
    );
}

calculScore(numQuiz: number,userId:number){
  this.ss.addScore(numQuiz, userId).subscribe(
    (response: Score) => {
      console.log('Score added successfully:', response);
      this.displayScore();
    },
    (error: any) => {
      console.error('Error adding score:', error);
    }
  );
}
displayScore(): void {
  // Retrieve score from the server
  this.ss.getScore(2,this.id).subscribe(
    (score: Score) => {
      // Display score in a SweetAlert popup
      Swal.fire({
        icon: 'success',
        title: 'Quiz completed!',
        text: `Your score: ${score.score}%`,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('User clicked OK');
        }
      });
    },
    (error: any) => {
      console.error('Error fetching score:', error);
    }
  );
}

}