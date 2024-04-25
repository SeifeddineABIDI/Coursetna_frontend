import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';
import { Topic } from 'app/modules/Ressource/models/topic';

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
  deleteQuiz(id :number): Observable<void>{
    return this.http.delete<void>(`${this.apiurl}/removeQuiz/${id}`);
  }
  addQuizAndAssignToTopic(quiz: Quiz, topicId: number): Observable<Quiz>{
    return this.http.post<Quiz>(`${this.apiurl}/addQuizAndAssignToTopic/${topicId}`, quiz);
  }
  updateQuiz(quiz: Quiz) {
    console.log("service quiz quiz:",quiz);
    return  this.http.put<Quiz>(`${this.apiurl}/updateQuiz`,quiz);
  }

  getQuizById(id:number): Observable<Quiz>{
    return this.http.get<Quiz>(`${this.apiurl}/getQuiz/${id}`);
  }

/*****END CRUD********* */

getAllTopics(): Observable<Topic[]>{
  return this.http.get<Topic[]>(`http://localhost:9000/pidev/topic/getAll`);
}

}
