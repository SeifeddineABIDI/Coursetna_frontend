import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subforum } from './subforum.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubforumService {

  constructor(private http: HttpClient) {}

  getAllSubforums(): Observable<Array<Subforum>> {
    return this.http.get<Array<Subforum>>('http://localhost:9000/pidev/subforums');
  }

  createSubforum(Subforum: Subforum): Observable<Subforum> {
    return this.http.post<Subforum>('http://localhost:9000/pidev/subforums',
      Subforum);
  }
}
