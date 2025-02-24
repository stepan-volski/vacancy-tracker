import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  private clientId = environment.google_clientId;
  public tokenSubject = new BehaviorSubject<string | null>(null);
  private sheetId = '1YEuSZqeUfsTwyEEmwPFOkX7iKNg1BS6x5t0HBbnAmHU';

  constructor(private http: HttpClient) {}

  signIn() {
    google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        callback: (response: any) => {
          this.tokenSubject.next(response.access_token);
        },
      })
      .requestAccessToken();
  }

  updateCell(range: string, value: string[]) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;
    const data = { values: [value] };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenSubject.getValue()}`,
    });

    return this.http.post(url, data, { headers });
  }
}
