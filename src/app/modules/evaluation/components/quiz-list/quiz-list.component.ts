import { Component, inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent{
  quizzes: Quiz[] =[];
  private toastrService:ToastrService;

  constructor(private qs:QuizService){};

   ngOnInit(): void {
     this.quizzes=this.getAllQuizzes() as any;
     console.log("here!!!"+this.quizzes);
    }

   getAllQuizzes(){
    return this.qs.getAllQuiz().subscribe(
    { next: (data)=>this.quizzes = data,
      error:(err)=> console.log(err),
      complete:()=> console.log('done')
    });
  }
  deleteQuiz(id:number){
    return  this.qs.deleteQuiz(id).subscribe((res: any)=>{
      console.log(res);
      this.quizzes=res;

      this.toastrService.success(res.message);
      this.getAllQuizzes();
  });
  }

}
