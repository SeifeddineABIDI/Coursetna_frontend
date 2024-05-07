import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vote } from './vote-button/vote.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  vote(vote: Vote): Observable<any> {
    return this.http.post('http://localhost:9000/pidev/votes', vote);
  }
  deleteVote(postId: number, email: string): Observable<any> {
    return this.http.delete(`http://localhost:9000/pidev/votes/${postId}?email=${email}`);
  }
}