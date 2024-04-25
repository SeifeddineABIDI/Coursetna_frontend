import { Component, inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Topic } from 'app/modules/Ressource/models/topic';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent{
  quizzes: Quiz[] =[];
  topics: Topic[]=[];

  topic=new FormControl('',Validators.required);

  constructor(private qs:QuizService,private fb:FormBuilder){
    this.quizForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required,Validators.pattern('[0-9]{1,3}')]),
    })
  };
  

   ngOnInit(): void {
     this.quizzes=this.getAllQuizzes() as any;
     this.fetchTopics();
    }

   getAllQuizzes(){
    return this.qs.getAllQuiz().subscribe(
    { next: (data)=>this.quizzes = data,
      error:(err)=> console.log(err),
      complete:()=> console.log('done')
    });
  }

  delQuiz(id: number) {
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
        this.qs.deleteQuiz(id).subscribe(
          (res: any) => {
            console.log("quiz supprimé avec succès")
            this.getAllQuizzes();
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
/******************************Edit Quiz************************ */
  isEditMode: boolean = false;
  idEditedQuiz:number;
  editModel(quiz: Quiz) {
    this.idEditedQuiz=quiz.numQuiz
    this.quizForm.patchValue(quiz); // Patch quiz data into the form
    this.isEditMode = true;
    this.toggleAddModal(true);
  }
  editQuiz(){
    if (this.quizForm.valid) {
      const editedQuiz: Quiz = {
        numQuiz:this.idEditedQuiz ,
        title:this.quizForm.value.title,
        description:this.quizForm.value.description,
        duree:this.quizForm.value.duree,
      };

      this.qs.updateQuiz(editedQuiz).subscribe(
        (result) => {
          console.log('Quiz updated successfully:', result);
          
          this.quizForm.reset();
          this.toggleAddModal(false);
          this.isEditMode = false;
          this.getAllQuizzes();
        },
        (error) => {
          console.error('Error occurred while updating quiz:', error);
        }
      );
  }else{
    this.quizForm.markAllAsTouched();
  }
  }
/******************************End Edit Quiz************************ */

/************model************/
// Variable pour contrôler l'affichage du modèle d'ajout
showAddModal: boolean = false;
modalTitle: string = 'Add New Quiz';

// Fonction pour basculer l'affichage du modèle d'ajout
toggleAddModal(status: boolean): void {
  this.showAddModal = status;
  this.modalTitle = status ? 'Add New Quiz' : 'Edit Quiz';
}
/*******Form**************** */
quizForm: FormGroup;

fetchTopics() {
  return this.qs.getAllTopics().subscribe(
    { next: (data)=>this.topics = data,
      error:(err)=> console.log(err),
      complete:()=> console.log('done')
    });
}

save(){
  if (this.isEditMode) {
    this.editQuiz();
  } else {
    this.saveNewQuiz();
  }
}
/********************************* */
saveNewQuiz(){
  const selectedTopicId: number = parseInt(this.topic.value, 10); // interprets the string as a decimal number.
    if (this.quizForm.valid) {
      this.qs.addQuizAndAssignToTopic(this.quizForm.value, selectedTopicId).subscribe(
        (result) => {
          console.log('Quiz added and assigned to topic successfully:', result);
          
          this.quizForm.reset();
          this.topic.reset();
          this.toggleAddModal(false);
          this.getAllQuizzes();
        },
        (error) => {
          console.error('Error occurred while adding quiz:', error);
        }
      );
  }else{
    this.quizForm.markAllAsTouched();
  }
}


}