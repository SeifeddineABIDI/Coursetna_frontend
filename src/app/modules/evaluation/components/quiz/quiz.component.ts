import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';
import { Topic } from 'app/modules/Ressource/models/topic';

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

  constructor(private qs:QuizService){
  }

  ngOnInit(): void {
    this.fetchTopics();
    this.getQuiz();
   }
   getQuiz(){
    return this.qs.getQuizNotEmpty().subscribe(
    { next: (data)=>{
      this.quizzes = data;
      //this.applyFilters();
    },
      error:(err)=> console.log(err),
      complete:()=> console.log(' getQuizNotEmpty done')
    });
  }

  fetchTopics() {
    this.qs.getAllTopics().subscribe(
      {
        next: (data) => (this.topics = data),
        error: (err) => console.log(err),
        complete: () => console.log(' getAllTopics done')
      }
    );
  }

  // onTopicChange(topicId: number): void {
  //   this.selectedTopicId = topicId;
  //   //this.applyFilters();
  // }

  // // applyFilters(): void {
  // //   this.filteredQuizzes = this.quizzes.filter((q) =>
  // //     q.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
  // //     (this.selectedTopicId === '' || q.topicId === this.selectedTopicId)
  // //   );
  // // }
}
