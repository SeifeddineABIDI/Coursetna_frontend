import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ressource } from '../models/ressource';
import { Options } from '../models/options';
import { Categorie } from '../models/categorie';
import { Topic } from '../models/topic';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseUrl = 'http://localhost:9000/pidev/ress'; 

  private baseUrl1 = 'http://localhost:9000/pidev/topic'; 

  constructor(private http: HttpClient) { }

  getTopicNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl1}/names`);
  }

  getAllRessources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(`${this.baseUrl}/getall`);
  }

  telechargerFichier(id: number) {
    return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
  }


  uploadFile(file: File,  description: string, categorie: string, options: string, userId: number, rating: number, topicName: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('categorie', categorie); 
    formData.append('options', options); 
    formData.append('userId', userId.toString());
    formData.append('rating', rating.toString());
    formData.append('topicName', topicName);

    return this.http.post<any>(`${this.baseUrl}/upload`, formData);
  }
  getResourcesByOption(option: Options): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(`${this.baseUrl}/${option}`);
  }

  getTopicsByOption(option: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.baseUrl}/topics-by-option?option=${option}`);
  }
  getRessourcesByTopic(topicId: number): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(`${this.baseUrl}/ressources-by-topic?topicId=${topicId}`);
}
archiverRessource(id: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}/archiver`, {}).pipe(
    catchError(error => {
      return throwError(error);
    })
  );
}
getRessourcesByCategoryAndTopicId(category: string, topicId: number): Observable<Ressource[]> {
  const url = `${this.baseUrl}/fltr/${category}/${topicId}`;
  return this.http.get<Ressource[]>(url);
}

désarchiverRessource(id: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}/désarchiver`, {}).pipe(
    catchError(error => {
      return throwError(error);
    })
  );
}

  // getResourcesByCategorie(categorie: Categorie, option: Options): Observable<Ressource[]> {
  //   return this.http.get<Ressource[]>(`${this.baseUrl}/${categorie}/${option}`);
  // }
  getResourcesByCategorieAndOption(categorie: Categorie, option: Options): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(`${this.baseUrl}/byCategorie/${categorie}/${option}`);
  }
  
  getRessourceById(id: number): Observable<Ressource> {
    return this.http.get<Ressource>(`${this.baseUrl}/getRessource/${id}`);
  }

  removeRessourceById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/removeRessource/${id}`, { responseType: 'text' });
  }

  updateRessource(ressource: Ressource): Observable<Ressource> {
    return this.http.put<Ressource>(`${this.baseUrl}/ressources/${ressource.id}`, ressource);
  }

  filterRessourcesByTitre(titre: string): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(`${this.baseUrl}/filterByTitre/${titre}`);
  }
  addRating(userId: number, resourceId: number, rating: number): Observable<any> {
    const url = `${this.baseUrl}/${userId}/resources/${resourceId}/rate`;
    return this.http.post(url, { rating });
  }

  getResourcesCountByTopicId(topicId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${topicId}/ressources/count`);
  }

  
  getResourcesByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  uploadFileDrive(file: File, path: string, description: string, categorie: string, userId: number, topicName: string, options: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);
    formData.append('description', description);
    formData.append('categorie', categorie);
    formData.append('userId', userId.toString());
    formData.append('topicName', topicName);
    formData.append('options', options);

    return this.http.post<any>('http://localhost:9000/pidev/api/v1/files/upload', formData).toPromise();
  }
  getLatestResourceId(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/latestResourceId`);
  }
}
