import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';

import { Stage } from '../modals/stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private apiServerUrl="http://localhost:8098"

  constructor(private http:HttpClient) { }

  public getStages():Observable<Stage[]>{
    return this.http.get<Stage[]>(`${this.apiServerUrl}/stage`);
  }
  filterStageByTitre(title: string): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.apiServerUrl}/stage/Titre/${title}`);
  }
  public getStageById(stageId:number):Observable<Stage>{
    return this.http.get<Stage>(`${this.apiServerUrl}/stage/${stageId}`);
  }

  public addStage(stage:Stage):Observable<Stage>{
    return this.http.post<Stage>(`${this.apiServerUrl}/stage/add`,stage);
  }


  public updateStage(stage:Stage ):Observable<Stage>{
    return this.http.put<Stage>(`${this.apiServerUrl}/stage/update/${stage.offreid}`,stage);
  }
  public deleteStage(offreid:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/stage/delete/${offreid}`);
  }
}
