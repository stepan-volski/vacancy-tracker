import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId = environment.google_clientId;
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
