import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envi } from 'app/modules/Reclamation/environnement/environnement';
import { Reclamation } from '../models/Reclamation.models';
import { Reponse } from '../models/Reponse.models';

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
  getonereclamation(id:any): Observable<any> {
    return this.httpclt.get(`${envi.BackUrl}/pidev/Reclamation/getreclamation/${id}` );
  }
  getallreclamationbyUSER(idUSER:any): Observable<any> {
    return this.httpclt.get(`${envi.BackUrl}/pidev/Reclamation/GetAllReclamtionsbyUser/${idUSER}` );
  }

  addReclamation(reclamationData: Reclamation, userid: number, topicid: number): Observable<Reclamation> {
    return this.httpclt.post<Reclamation>(`${envi.BackUrl}/pidev/Reclamation/addReclamtionAndAssignToUserandTopic/${userid}/${topicid}`, reclamationData);
  }
  addreponse(reponseData: Reponse,  id: any): Observable<Reponse> {
    return this.httpclt.post<Reponse>(`${envi.BackUrl}/pidev/Reponse/addReponseAndAssignToReclamtion/${id}`, reponseData);
  }
}
