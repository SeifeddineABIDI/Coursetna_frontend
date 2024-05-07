import { Pipe, PipeTransform } from '@angular/core';
import { Quiz } from '../../models/quiz';
import { Question } from '../../models/question';

@Pipe({
  name: 'filter'
})
export class FilterQuestionPipe implements PipeTransform {
  transform(questions: Question[], searchTerm: string): Question[] {
    if (!questions || !searchTerm) {
      return questions;
    }
    searchTerm = searchTerm.toLowerCase();
    return questions.filter((q: Question) => // Change 'quiz' to 'q' and use the correct properties of the Question model
      q.question.toLowerCase().includes(searchTerm) || 
      q.choice1.toLowerCase().includes(searchTerm) || 
      q.choice2.toString().toLowerCase().includes(searchTerm) || 
      q.choice3.toString().toLowerCase().includes(searchTerm) || 
      q.correctAnswer.toString().toLowerCase().includes(searchTerm) || 
      q.points.toString().toLowerCase().includes(searchTerm) 
    );
  }
}
