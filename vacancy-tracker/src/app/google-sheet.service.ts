import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoogleAuthService } from './google-auth.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {
  private sheetId = '1YEuSZqeUfsTwyEEmwPFOkX7iKNg1BS6x5t0HBbnAmHU';

  constructor(
    private http: HttpClient,
    private authService: GoogleAuthService
  ) {}

  updateCell(range: string, value: string[]) {
    const accessToken = this.authService.getAccessToken();
    if (!accessToken) {
      console.error('No access token available');
      return;
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;
    const data = { values: [value] };
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });

    return this.http.post(url, data, { headers });
  }
}
