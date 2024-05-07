import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  apiurl = 'http://localhost:9000/pidev/answer';
  constructor(private http:HttpClient) { }

  /*****CRUD********** */
  getAllResponse(): Observable<Answer[]>{
    return this.http.get<Answer[]>(`${this.apiurl}/getAll`);
  }
  addReponseAndAssignToQuestionAndUser(Answer: Answer, questionId: number,userId:number){
    return this.http.post<Answer>(`${this.apiurl}/addReponseAndAssignToQuestionAndUser/${userId}/${questionId}`, Answer);
  }

  getAnswersByUserAndQuiz(quizId: number,userId:number): Observable<Answer[]>{
    return this.http.get<Answer[]>(`${this.apiurl}/getAnswersByUserAndQuiz/${userId}/${quizId}`);
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

