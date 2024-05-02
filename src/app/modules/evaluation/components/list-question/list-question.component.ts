import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent {
  questions: Question[] =[];
  id!:number;
  questionForm: FormGroup;


  constructor(
    private qs:QuestionService,
    private quizService:QuizService,
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
}
