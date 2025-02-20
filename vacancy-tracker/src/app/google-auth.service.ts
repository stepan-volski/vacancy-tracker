import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId = '37001374079-ek7ufuj9rkeur308nmaalu67dd4lo03i.apps.googleusercontent.com'; // Replace with your Client ID
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public accessToken$ = this.tokenSubject.asObservable();

  constructor() {
    this.loadGoogleAuth();
  }

  private loadGoogleAuth() {
    google.accounts.oauth2.initTokenClient({
      client_id: this.clientId,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      callback: (response: any) => {
        this.tokenSubject.next(response.access_token);
      }
    });
  }

  signIn() {
    google.accounts.oauth2.initTokenClient({
      client_id: this.clientId,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      callback: (response: any) => {
        this.tokenSubject.next(response.access_token);
      }
    }).requestAccessToken();
  }

  getAccessToken(): string | null {
    return this.tokenSubject.getValue();
  }
}
