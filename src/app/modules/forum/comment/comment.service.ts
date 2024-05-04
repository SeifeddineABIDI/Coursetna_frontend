import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from './comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>('http://localhost:9000/pidev/comments/by-post/' + postId);
  }

  postComment(commentPayload: Comment): Observable<any> {
    return this.httpClient.post<any>('http://localhost:9000/pidev/comments/', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<Comment[]>('http://localhost:9000/pidev/comments/by-user/' + name);
  }
}
