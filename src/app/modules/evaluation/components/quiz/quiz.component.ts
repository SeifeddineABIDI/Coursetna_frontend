import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';
import { Topic } from 'app/modules/ressources/models/topic';
import { Router } from '@angular/router';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizzes: Quiz[] = [];
  topics: Topic[] = [];
  searchTerm: string = ''; // Variable to hold the search term
  selectedTopicId: number | null = null; // Property to store the selected topic ID
  filteredQuizzes: Quiz[] = [];

  currentUser: any; 

  constructor(private qs:QuizService,private router: Router,private scoreService: ScoreService){
  }

  ngOnInit(): void {
    this.fetchTopics();
    this.getQuiz();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));//recuperer l'utilisateur connecté

   }
   getQuiz(){
    return this.qs.getQuizNotEmpty().subscribe(
    { next: (data)=>{
      this.quizzes = data;
    },
      error:(err)=> console.log(err),
      complete:()=> console.log(' getQuizNotEmpty done')
    });
  }

/**************************** */
redirectToQuiz(id: number): void {
  this.scoreService.getScore(this.currentUser.id, id).subscribe({
    next: (score: Score) => {
      if (score) {
        this.router.navigate(['/answers', id]);
      } else {
        this.router.navigate(['/questions', id]);
      }
    },
    error: (err) => {
      console.error('Error fetching score:', err);
      // Navigate to questions as a fallback in case of error
      this.router.navigate(['/questions', id]);
    }
  });
}
/*************************** */
  fetchTopics() {
    this.qs.getAllTopics().subscribe(
      {
        next: (data) => (this.topics = data),
        error: (err) => console.log(err),
        complete: () => console.log(' getAllTopics done')
      }
    );
  }

  
}
