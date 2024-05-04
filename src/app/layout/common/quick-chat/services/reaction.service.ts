import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reaction } from '../models/Reaction';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private baseUrl = 'http://localhost:9000/pidev/reaction'; 

  constructor(private http: HttpClient) { }


  addReaction(user: number, message: number, reaction: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reacting?user=${user}&message=${message}`, reaction);
  }

}
