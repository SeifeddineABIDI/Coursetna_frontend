import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = 'http://localhost:9000/pidev/topic'; 

  constructor(private http: HttpClient) { }

  ajouterTopic(topic: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addTopic`, topic);
  }
  verifierNomDeSujet(nom: string): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:9000/pidev/topic/verifierNomDeSujet/' + nom);
  }
}
