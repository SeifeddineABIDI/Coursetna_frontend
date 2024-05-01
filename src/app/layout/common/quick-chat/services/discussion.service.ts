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

  modifyDiscussionGroup(discussion: number, userStart: number, title: string, userList: string, admin: number, image: string | ArrayBuffer): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyDiscussionGroup?discussion=${discussion}&userStart=${userStart}&title=${title}&userList=${userList}&admin=${admin}`, image,{ responseType: 'text' as 'json' });
  }

  modifyDiscussionCommunity(discussion: number, userStart: number, title: string, userList: string, discussionList: string, admin: number, image: string | ArrayBuffer): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyDiscussionCommunity?discussion=${discussion}&userStart=${userStart}&title=${title}&userList=${userList}&discussionList=${discussionList}&userList=${admin}`, image,{ responseType: 'text' as 'json' });
  }

  addAdminsToDiscussion(discussion: number, admin: number, userList: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/addAdminsToDiscussion?discussion=${discussion}&admin=${admin}&userList=${userList}`, "",{ responseType: 'text' as 'json' });
  }
  
  leaveDiscussion(user: number, discussion: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/leaveDiscussion?user=${user}&discussion=${discussion}`, "");
  }

  deleteDiscussion(user: number, discussion: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/deleteDiscussion?user=${user}&discussion=${discussion}`, "",{ responseType: 'text' as 'json' });
  }

  retrieveAllDiscussions(id: number): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/retrieveAllDiscussions?id=${id}`);
  }

  retrieveAllCommunities(id: number): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/retrieveAllCommunities?id=${id}`);
  }
}
