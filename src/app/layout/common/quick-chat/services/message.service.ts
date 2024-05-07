import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';
import { environment } from 'app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl =`${environment.apiUrl}/message`; 

  constructor(private http: HttpClient) { }

  retrieveAllMessages(id: number): Observable<Message[]> {
    localStorage.setItem('currentLocalDateTime', new Date().toISOString());
    return this.http.get<Message[]>(`${this.baseUrl}/retrieveAllMessages?id=${id}`);
  }

  retrieveMessages(id: number, page: number, size: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/retrieveMessages?id=${id}&page=${page}&size=${size}`);
  }

  retrieveRecentMessages(id: number,recent: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/retrieveRecentMessages?id=${id}&recentDate=${recent}`);
  }

  sendMessage(user: number, discussion: number, message: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sendMessage?userSender=${user}&discussion=${discussion}`, message);
  }

  modifyMessage(id: number, message: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyMessage?id=${id}`, message);
  }

  deleteMessage(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/deleteMessage?id=${id}`, "");
  }

  replyMessage(user: number, discussion: number, message: number, reply: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/replyMessage?userSender=${user}&discussion=${discussion}&message=${message}`, reply);
  }

  pinMessage(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/pinMessage?id=${id}`, "");
  }

  askQuestion(ask: string) {
    return this.http.post(`${this.baseUrl}/askQuestion`, ask, { responseType: 'json' })
  }
}
