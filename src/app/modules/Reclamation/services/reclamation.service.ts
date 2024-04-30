import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envi } from 'app/modules/Reclamation/environnement/environnement';
import { Reclamation } from '../models/Reclamation.models';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private httpclt: HttpClient) { }

  alltopics() {
    return this.httpclt.get(`${envi.BackUrl}/pidev/topic/getAll`);
  }

  allreclamation() {
    return this.httpclt.get(`${envi.BackUrl}/pidev/Reclamation/all`);
  }

  deletereclamation(id: any) {
    return this.httpclt.delete(`${envi.BackUrl}/pidev/Reclamation/deleteReclamationById/${id}`);
  }

  stats(): Observable<any> {
    return this.httpclt.get(`${envi.BackUrl}/pidev/Reclamation/stats`, { responseType: 'text' });
  }

  addReclamation(reclamationData: Reclamation, userid: number, topicid: number): Observable<Reclamation> {
    return this.httpclt.post<Reclamation>(`${envi.BackUrl}/pidev/Reclamation/addReclamtionAndAssignToUserandTopic/${userid}/${topicid}`, reclamationData);
  }
}
