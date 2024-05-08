import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cv } from '../modals/Cv';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private baseUrl = 'http://localhost:8098/cv';  // Modifiez selon votre configuration

  constructor(private http: HttpClient) { }

  uploadCv(file: File, cv: Cv): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('cv', new Blob([JSON.stringify(cv)], { type: 'application/json' }));
  
    const req = new HttpRequest('POST', `${this.baseUrl}/cv`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  
    console.log('Sending:', req);
    return this.http.request(req);
  }
  



  handleFileUpload(file: File): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<HttpResponse<any>>(`${this.baseUrl}/upload`, formData, {
      observe: 'response'
    });
  }








}
