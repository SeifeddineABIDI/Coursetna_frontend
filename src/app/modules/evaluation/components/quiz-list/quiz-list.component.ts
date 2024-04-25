import { Component, inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from '../../models/quiz';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent{
  //quizzes: Quiz[] =[];
  quizzes: any;
  private toastrService:ToastrService;

  constructor(private qs:QuizService){};

   ngOnInit(): void {
     this.quizzes=this.getAllQuizzes() as any;
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
            console.log("Forum supprimé avec succès")
            this.getAllQuizzes();
            Swal.fire(
              'Deleted!',
              'this forum has been deleted.',
              'success'
            )
            // Recharger la page après la suppression
            // this.reloadPage();
          }
        )
      }
    })
  }
  
  reloadPage() {
    window.location.reload();
  }

}
