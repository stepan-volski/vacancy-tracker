import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenshotService {
  private apiUrl = 'http://localhost:3000/screenshot';

  constructor(private http: HttpClient) {}

  getScreenshot(url: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { url }, { responseType: 'json' });
  }
}
