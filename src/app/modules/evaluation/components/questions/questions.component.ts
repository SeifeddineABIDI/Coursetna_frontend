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

  timer: any;
  durationInSeconds: number = 60; // Duration: 60 seconds
  timeRemaining: number;

  constructor(private qs:QuestionService,private Act: ActivatedRoute){

  }

  ngOnInit(): void {
    this.id=this.Act.snapshot.params['id'];
    this.questions=this.getAll(this.id) as any;

    this.startTimer();
  }
/***********timer********** */
// startTimer(): void {
//   const durationInSeconds = this.durationInMinutes * 60;
//   this.timer = setTimeout(() => {
//     // Timer logic: Close the quiz when the duration ends
//     alert('Quiz time is up!');
//     // Implement code to close the quiz or navigate away
//   }, durationInSeconds * 1000); // Convert duration to milliseconds
// }
startTimer(): void {
  this.timeRemaining = this.durationInSeconds;
  this.timer = setInterval(() => {
    this.timeRemaining--;
    if (this.timeRemaining <= 0) {
      clearInterval(this.timer);
      alert('Quiz time is up!');
      // Implement code to close the quiz or navigate away
    }
  }, 1000); // Update every second
}
/******end timer************* */
  
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

saveQuiz(): void {
  clearTimeout(this.timer);
  console.log('Quiz saved!');
  // Logique pour soumettre les réponses et calculer le score
  // Vous pouvez ajouter votre logique ici pour calculer le score en fonction des réponses de l'utilisateur
  console.log(this.userAnswers);
}
formatTime(seconds: number): string {
  const mins: string = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs: string = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

}
