import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from '../models/score';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  apiurl = 'http://localhost:9000/pidev/score';
  constructor(private http:HttpClient) { }

  addScore(numQuiz: number,userId:number):Observable<Score>{
    return this.http.get<Score>(`${this.apiurl}/addScore/${numQuiz}/${userId}`);
  }

  getScore(userId:number,numQuiz: number):Observable<Score>{
    return this.http.get<Score>(`${this.apiurl}/getScoreByUserAndQuiz/${userId}/${numQuiz}`);
  }

}
