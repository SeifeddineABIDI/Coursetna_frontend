import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  apiurl = 'http://localhost:9000/pidev/quiz';
  constructor(private http:HttpClient) { }

  /*****CRUD********** */
  getAllQuiz(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${this.apiurl}/getAll`);
  }
  getQuizById(id:number): Observable<Quiz>{
    return this.http.get<Quiz>(`${this.apiurl}/getQuiz/${id}`);
  }
  createQuiz(quiz: Quiz): Observable<Quiz>{
    return this.http.post<Quiz>(`${this.apiurl}/addQuiz`, quiz);
  }
  updateQuiz(quiz: Quiz) {
    return  this.http.put<Quiz>(`${this.apiurl}/updateQuiz`,quiz);
  }
  deleteQuiz(id :number): Observable<void>{
    return this.http.delete<void>(`${this.apiurl}/removeQuiz/${id}`);
  }
/*****END CRUD********* */
}
