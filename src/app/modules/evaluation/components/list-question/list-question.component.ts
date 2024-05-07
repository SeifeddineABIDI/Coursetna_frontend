import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { StatService } from '../../services/stat.service';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent {
  searchTerm: string = ''; // Variable to hold the search term

  questions: Question[] =[];
  id!:number;
  questionForm: FormGroup;


  constructor(
    private qs:QuestionService,
    private quizService:QuizService,
    private statService:StatService,
    private Act: ActivatedRoute,
    private fb:FormBuilder
  ){
    this.questionForm = this.fb.group({
      question: new FormControl('', [Validators.required]),
      choice1: new FormControl('', [Validators.required]),
      choice2: new FormControl('', [Validators.required]),
      choice3: new FormControl('', [Validators.required]),
      correctAnswer: new FormControl('', [Validators.required]),
      points: new FormControl('', [Validators.required,Validators.pattern('[0-9]{1,3}')]),    
    })
  }

  ngOnInit(): void {
    this.id = this.Act.snapshot.params['id'];
    this.getAllQuestions();
   }
/******get all ***************************** */
  getAllQuestions(){
   return this.qs.getQuestionsByQuiz(this.id).subscribe(
   { next: (data)=>this.questions = data,
     error:(err)=> console.log(err),
     complete:()=> console.log('done')
   });
}
/**********delete question**************** */
delQuestion(quistionId:number){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085D6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.qs.deleteQuestion(quistionId).subscribe(
        (res: any) => {
          console.log("question supprimé avec succès")
          this.getAllQuestions();
          Swal.fire(
            'Deleted!',
            'this Quiz has been deleted.',
            'success'
          )
        }
      )
    }
  })
}
/**************************************** */

/******************************Edit Question*********************** */
// Fonction pour basculer l'affichage du modèle 
showModal: boolean = false;
toggleModal(status: boolean): void {
  this.showModal = status;
}

idEditedQuestion:number;
editModel(question: Question) {
  this.idEditedQuestion=question.numQuestion
  this.questionForm.patchValue(question); // Patch quiz data into the form
  
  console.log("question: ", question);
  this.showModal = true;
}
editQuestion(){
  const editedQuestion: Question=this.questionForm.value;
  editedQuestion.numQuestion=this.idEditedQuestion;
  this.qs.updateQuestion(editedQuestion,this.id).subscribe(
    (result) => {
      console.log('Question updated successfully:', result);
      
      this.questionForm.reset();
      this.getAllQuestions();
    },
    (error) => {
      console.error('Error occurred while updating Question:', error);
    }
  );
}
/******************************End Edit Question************************ */
/******************************Stat Question************************ */
showModalStat: boolean = false;
totalCorrectAnswers: number;
TotalAnswers: number;
percentageCorrectAnswers:number;

toggleModalStat(status: boolean): void {
  this.showModalStat = status;
}

getTotalCorrectAnswersForQuestion(questionId: number): void {
  this.totalCorrectAnswers = 0;
  this.TotalAnswers = 0;
  this.percentageCorrectAnswers = 0;
  this.showModalStat = true;

  console.log("questionId: ", questionId);

  this.statService.getTotalCorrectAnswersForQuestion(questionId).subscribe(
    (result) => {
      this.totalCorrectAnswers = result;
      console.log("totalCorrectAnswers: ", this.totalCorrectAnswers);
      this.calculatePercentageCorrectAnswers(); // Calculate percentage after getting total correct answers
    },
    (error) => {
      console.error('Error fetching total correct answers:', error);
    }
  );

  this.statService.getTotalAnswersForQuestion(questionId).subscribe(
    (result) => {
      this.TotalAnswers = result;
      console.log("TotalAnswers: ", this.TotalAnswers);
      this.calculatePercentageCorrectAnswers(); // Calculate percentage after getting total answers
    },
    (error) => {
      console.error('Error fetching total Answers:', error);
    }
  );
}

private calculatePercentageCorrectAnswers(): void {
  if (this.TotalAnswers === 0) {
    this.percentageCorrectAnswers = 0;
  } else {
    this.percentageCorrectAnswers = (this.totalCorrectAnswers / this.TotalAnswers) * 100;
  }
  console.log("percentageCorrectAnswers: ", this.percentageCorrectAnswers);
}

/******************************Stat Question************************ */

}
