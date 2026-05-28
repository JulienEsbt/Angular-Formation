import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private editionAuthorization: boolean = false;

  isEditionAuthorized(): boolean {
    return this.editionAuthorization;
  }

  setEditionAuthorization(value: boolean): void {
    this.editionAuthorization = value;
  }
}
