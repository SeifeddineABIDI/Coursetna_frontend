import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Initialize with a default value, or `null` if no value is selected.
  private selectedOffreIdSource = new BehaviorSubject<number | null>(null);
  currentOffreId = this.selectedOffreIdSource.asObservable();

  // This method updates the selected ID.
  changeOffreId(id: number | null) {
    this.selectedOffreIdSource.next(id);
  }
}
