import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class File {

  constructor(private http: HttpClient) { }

  async downloadFile(url: string): Promise<Blob> {
    try {
      const blob: Blob | undefined = await this.http.get(url, { responseType: 'blob' }).toPromise();
      if (!blob) {
        throw new Error('Le téléchargement du fichier a échoué.');
      }
      return blob;
    } catch (error) {
      throw new Error('Une erreur est survenue lors du téléchargement du fichier.');
    }
  }
}
