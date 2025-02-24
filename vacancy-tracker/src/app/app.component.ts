import { Component } from '@angular/core';
import { GoogleService } from './google.service';
import { OpenAIService } from './open-ai.service';
import { ScreenshotService } from './screenshot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private googleService: GoogleService,
    private openAIService: OpenAIService,
    private screenshotService: ScreenshotService
  ) {}

  urlInput = '';

  signIn() {
    this.googleService.signIn();
  }

  getDate(): string {
    const date = new Date();
    const month = date
      .toLocaleString('en-US', { month: 'short' })
      .toLowerCase();
    const day = date.getDate();
    return `${month} ${day}`;
  }

  addVacancyToSheet(url: string) {
    this.screenshotService.getScreenshot(url).subscribe((screenshot) => {
      this.openAIService
        .analyzeScreenshot(screenshot.base64)
        .subscribe((response) => {
          const company = (response as any)['choices'][0].message.content.split('**')[0];
          const position = (response as any)['choices'][0].message.content.split('**')[1];
          this.googleService.updateCell('Sheet1!A1', [this.getDate(), company, position, this.urlInput])
          ?.subscribe();
        });
    });
  }
}
