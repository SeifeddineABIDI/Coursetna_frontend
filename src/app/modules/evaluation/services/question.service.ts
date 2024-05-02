import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiurl = 'http://localhost:9000/pidev/question';
  constructor(private http:HttpClient) { }

  /*****CRUD********** */
  getAllQuestions(id :number): Observable<Question[]>{
    return this.http.get<Question[]>(`${this.apiurl}/getAllQuestions/${id}`);
  }
  addQuestionAndAssignToQuiz(Question: Question, quizId: number): Observable<Question>{
    return this.http.post<Question>(`${this.apiurl}/addQuestionAndAssignToQuiz/${quizId}`, Question);
  }
  getQuestionsByQuiz(id :number): Observable<Question[]>{
    return this.http.get<Question[]>(`${this.apiurl}/getAllQuestions/${id}`);
  }

  
  // deleteQuestion(id :number): Observable<void>{
  //   return this.http.delete<void>(`${this.apiurl}/removeQuestion/${id}`);
  // }

  // updateQuestion(Question: Question) {
  //   console.log("service Question Question:",Question);
  //   return  this.http.put<Question>(`${this.apiurl}/updateQuestion`,Question);
  // }

  // getQuestionById(id:number): Observable<Question>{
  //   return this.http.get<Question>(`${this.apiurl}/getQuestion/${id}`);
  // }

/*****END CRUD********* */


}
