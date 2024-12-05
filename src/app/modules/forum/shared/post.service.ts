import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model.model';
import { Observable } from 'rxjs';
import { CreatePost } from '../post/create-post/create-post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:9000/pidev/posts');
  }

  createPost(formData: FormData): Observable<any> {
  return this.http.post('http://localhost:9000/pidev/posts', formData);
}


  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:9000/pidev/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:9000/pidev/posts/by-user/' + name);
  }
  getPostImage(postId: number): Observable<Blob> {
    return this.http.get('http://localhost:9000/pidev/posts/' + postId + '/image', { responseType: 'blob' });
  }
}
