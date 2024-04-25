import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discussion } from '../models/Discussion';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private baseUrl = 'http://localhost:9000/pidev/discussion'; 

  constructor(private http: HttpClient) { }

  

  startDiscussionDuo(userStart: number, userEnd: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/startDiscussionDuo?userStart=${userStart}&userEnd=${userEnd}`, "");
  }

  startDiscussionGroup(userStart: number, title: string, userList: string, image: string | ArrayBuffer): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/startDiscussionGroup?userStart=${userStart}&title=${title}&userList=${userList}`, image);
  }

  startDiscussionCommunity(userStart: number, title: string, userList: string, discussionList: string, image: string | ArrayBuffer): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/startDiscussionCommunity?userStart=${userStart}&title=${title}&userList=${userList}&discussionList=${discussionList}`, image);
  }

  addUserToDiscussion(id: number, userList: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/addUserToDiscussion?id=${id}`, userList);
  }

  retrieveAllDiscussions(id: number): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/retrieveAllDiscussions?id=${id}`);
  }

  retrieveAllCommunities(id: number): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/retrieveAllCommunities?id=${id}`);
  }
}
