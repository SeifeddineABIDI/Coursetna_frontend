import { Component } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';

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

  constructor(private qs:QuestionService,private Act: ActivatedRoute,private qzs:QuizService){
  }

  ngOnInit(): void {
    this.id=this.Act.snapshot.params['id'];    
    this.questions=this.getAll(this.id) as any;
    this.getQuizDuration(this.id);
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
getAll(id: number){
  this.qs.getAllQuestions(id).subscribe(
    { next: (data)=>this.questions = data,
      error:(err)=> console.log(err),
      complete:()=> console.log('getAll() done')
    });
}
currentQuestionIndex: number = 0;
userAnswers: any = {};
// onNext(): void {
//   if (this.currentQuestionIndex < this.questions.length - 1) {
//     this.currentQuestionIndex++;
//   }
// }

// onPrevious(): void {
//   if (this.currentQuestionIndex > 0) {
//     this.currentQuestionIndex--;
//   }
// }

saveQuiz(): void {
  clearTimeout(this.timer);
  console.log('Quiz saved!');
  // Logique pour soumettre les réponses et calculer le score
  // Vous pouvez ajouter votre logique ici pour calculer le score en fonction des réponses de l'utilisateur
  console.log(this.userAnswers);
}




}
