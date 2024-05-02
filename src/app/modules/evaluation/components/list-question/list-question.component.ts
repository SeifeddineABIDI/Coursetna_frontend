import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent {
  questions: Question[] =[];
  id!:number;


  constructor(private qs:QuestionService,private router: Router,private Act: ActivatedRoute,
  ){

  }

  ngOnInit(): void {
    this.id = this.Act.snapshot.params['id'];
    this.getAllQuestions();
   }

  getAllQuestions(){
   return this.qs.getQuestionsByQuiz(this.id).subscribe(
   { next: (data)=>this.questions = data,
     error:(err)=> console.log(err),
     complete:()=> console.log('done')
   });
}

}
