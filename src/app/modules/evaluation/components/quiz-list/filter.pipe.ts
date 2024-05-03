import { Pipe, PipeTransform } from '@angular/core';
import { Quiz } from '../../models/quiz';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(quizzes: Quiz[], searchTerm: string): Quiz[] {
    if (!quizzes || !searchTerm) {
      return quizzes;
    }
    searchTerm = searchTerm.toLowerCase();
    return quizzes.filter((quiz: Quiz) =>
      quiz.title.toLowerCase().includes(searchTerm) ||
      quiz.description.toLowerCase().includes(searchTerm) ||
      quiz.duree.toString().toLowerCase().includes(searchTerm)
    );
  }
}
