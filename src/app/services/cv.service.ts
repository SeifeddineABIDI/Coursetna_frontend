import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cv } from '../modals/Cv';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private baseUrl = 'http://localhost:8080/cv';  // Modifiez selon votre configuration

  constructor(private http: HttpClient) { }

  uploadCv(file: File, cv: Cv): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('cv', new Blob([JSON.stringify(cv)], { type: 'application/json' }));

    const req = new HttpRequest('POST', `${this.baseUrl}/cv`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
