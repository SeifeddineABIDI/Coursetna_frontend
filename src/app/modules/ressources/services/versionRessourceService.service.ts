import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VersionRessource } from '../models/version-ressource';


@Injectable({
  providedIn: 'root'
})
export class VersionRessourceService {
  private baseUrl = 'http://localhost:9000/pidev/version';

  constructor(private http: HttpClient) { }

  createNewVersion(ressourceId: number, versionName: string, file: File): Observable<VersionRessource> {
    const formData = new FormData();
    formData.append('ressourceId', ressourceId.toString());
    formData.append('versionName', versionName);
    formData.append('file', file);

    return this.http.post<VersionRessource>(`${this.baseUrl}/create`, formData);
  }

  getAllVersionsByRessourceId(ressourceId: number): Observable<VersionRessource[]> {
    return this.http.get<VersionRessource[]>(`${this.baseUrl}/all?ressourceId=${ressourceId}`);
  }

  deleteVersion(versionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${versionId}`);
  }
  telechargerFichier(versionId: number) {
    return this.http.get(`${this.baseUrl}/download/${versionId}`, { responseType: 'blob' });
  }

}
