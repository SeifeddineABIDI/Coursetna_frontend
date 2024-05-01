import { Component } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';
import { Reponse } from '../../models/reponse';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
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

saveQuiz(): void {
  clearTimeout(this.timer);
  console.log('Quiz saved!');
  const responses: { [key: string]: string } = {};
  this.questions.forEach((question, index) => {
    responses[`Question ${index + 1}`] = this.quizForm.get(`selectedOption_${index}`).value;
  });
  console.log('Quiz responses:', responses);
}



}
