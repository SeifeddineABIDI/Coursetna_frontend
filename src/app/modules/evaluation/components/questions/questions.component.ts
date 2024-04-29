import { Component } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  questions: Question[] =[];
  id!:number;

  constructor(private qs:QuestionService,private Act: ActivatedRoute){

  }

  ngOnInit(): void {
    this.id=this.Act.snapshot.params['id'];
    this.questions=this.getAll(this.id) as any;

  }
  
  getAll(id: number){
    return this.qs.getAllQuestions(id).subscribe(
    { next: (data)=>this.questions = data,
      error:(err)=> console.log(err),
      complete:()=> console.log('done')
    });
  }
/****************************** */
  currentQuestionIndex: number = 0;
  userAnswers: any = {};
onNext(): void {
  if (this.currentQuestionIndex < this.questions.length - 1) {
    this.currentQuestionIndex++;
  }
}

onPrevious(): void {
  if (this.currentQuestionIndex > 0) {
    this.currentQuestionIndex--;
  }
}

onSubmit(): void {
  // Logique pour soumettre les réponses et calculer le score
  // Vous pouvez ajouter votre logique ici pour calculer le score en fonction des réponses de l'utilisateur
  console.log(this.userAnswers);
}

}
