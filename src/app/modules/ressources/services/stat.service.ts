import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from '../models/commentaire';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root'
})
export class statService {

  private baseUrl = 'http://localhost:9000/pidev/stats'; 

  constructor(private http: HttpClient) { }



  getResourcesAddedByWeek(startOfWeek: Date, endOfWeek: Date): Observable<number> {
    const params = { startOfWeek: startOfWeek.toISOString(), endOfWeek: endOfWeek.toISOString() };
    return this.http.get<number>(`${this.baseUrl}/resources/added-by-week`, { params });
  }

  getResourcesByOption(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/resources/by-option`);
  }

}
