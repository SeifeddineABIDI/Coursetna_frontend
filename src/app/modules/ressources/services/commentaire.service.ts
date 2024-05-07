import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from '../models/commentaire';
import { Ressource } from '../models/ressource';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private baseUrl = 'http://localhost:9000/pidev/comm'; 

  constructor(private http: HttpClient) { }

  addCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.baseUrl}/addCom`, commentaire);
  }

  getAllCommentaires(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseUrl}/comments`);
  }
  getNombreCommentairesByRessourceId(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/ressources/${id}/commentaires/nombre`);
  }

  getCommentairesByRessourceId(ressourceId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseUrl}/ressource/${ressourceId}`);
  }

  removeCommentaire(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${id}`, { responseType: 'text' });
  }
  //likeee et dislikeeee//
  ajouterLike(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/likes`, {});
  }

  ajouterDislike(commentaireId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${commentaireId}/dislikes`, {});
  }

  supprimerLike(commentaireId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${commentaireId}/likes`);
  }

  supprimerDislike(commentaireId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${commentaireId}/dislikes`);
  }

}
