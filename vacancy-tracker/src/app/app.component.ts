import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { GoogleAuthService } from './google-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: GoogleAuthService, private sheetsService: ApiService) {}

  signIn() {
    this.authService.signIn();
  }

  updateSheet() {
    this.sheetsService.updateCell('Sheet1!A1', 'Hello from Angular!')?.subscribe(response => {
      console.log('Cell Updated:', response);
    }, error => {
      console.error('Error:', error);
    });
  }
}
