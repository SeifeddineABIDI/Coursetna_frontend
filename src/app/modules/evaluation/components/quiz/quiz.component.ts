import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizzes: Quiz[] =[];
  constructor(private qs:QuizService){

  }

  ngOnInit(): void {
    this.quizzes=this.getQuiz() as any;
    //this.fetchTopics();
   }
   getQuiz(){
    return this.qs.getQuizNotEmpty().subscribe(
    { next: (data)=>this.quizzes = data,
      error:(err)=> console.log(err),
      complete:()=> console.log('done')
    });
  }
}
