import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reaction } from '../models/Reaction';
import { environment } from 'app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private baseUrl = `${environment.apiUrl}/reaction`; 

  constructor(private http: HttpClient) { }


  addReaction(user: number, message: number, reaction: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reacting?user=${user}&message=${message}`, reaction);
  }

}
