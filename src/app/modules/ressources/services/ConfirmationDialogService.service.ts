import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor() { }

  showConfirmation(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const confirmation = window.confirm(message);
      resolve(confirmation);
    });
  }
}
