import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../models/question';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {
  questionForm: FormGroup;
  questions: Question[] =[];
  id!:number;


  constructor(
    private qs:QuestionService,
    private fb:FormBuilder,
    private Act: ActivatedRoute,
    private router: Router,

  ){
    this.questionForm = this.fb.group({
      question: new FormControl('', [Validators.required]),
      choice1: new FormControl('', [Validators.required]),
      choice2: new FormControl('', [Validators.required]),
      choice3: new FormControl('', [Validators.required]),
      correctAnswer: new FormControl('', [Validators.required]),
      points: new FormControl('', [Validators.required,Validators.pattern('[0-9]{1,3}')]),

    })
  };

  ngOnInit(): void {
    this.id = this.Act.snapshot.params['id'];

  }

  saveNewQusetion(){    
    this.qs.addQuestionAndAssignToQuiz(this.questionForm.value,this.id).subscribe(
      (result) => {
        console.log('Qusetion added and assigned to Quiz successfully:', result);
        this.questionForm.reset();
      },
      (error) => {
        console.error('Error occurred while adding Qusetion:', error);
      }
    );

    Swal.fire({
      icon: 'success',
      title: 'Qusetion added successfully!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigate(['/quizList']);
    });
    console.log('Qusetion saved!');
  }
  
}
