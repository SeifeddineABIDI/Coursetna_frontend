import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  apiurl = 'http://localhost:9000/pidev';
  constructor(private http:HttpClient) { }

  getTotalCorrectAnswersForQuestion(questionId: number): Observable<number> {
    return this.http.get<number>(`${this.apiurl}/answer/getTotalCorrectAnswersForQuestion/${questionId}`);
  }

  getTotalAnswersForQuestion(questionId: number): Observable<number> {
    return this.http.get<number>(`${this.apiurl}/answer/getTotalAnswersForQuestion/${questionId}`);
  }
  
/////////////////////////
  getPercentageCorrectAnswers(): Observable<number> {
    return this.http.get<number>(`${this.apiurl}/answer/percentageCorrect`);
  }

  getAverageScore(): Observable<number> {
    return this.http.get<number>(`${this.apiurl}/score/Average`);
  }
}
