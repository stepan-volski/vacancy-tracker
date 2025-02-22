import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.openAI_apiKey;

  constructor(private http: HttpClient) {}

  analyzeScreenshot(screenshotBase64: string) {
    const payload = {
      messages: [
        {
          content: [
            {
              type: 'text',
              text: "This is an image from a job description. Provide company name and position name in the following format: 'Company name' ** 'Position'",
            },
          ],
          role: 'system',
        },
        {
          content: [
            {
              image_url: {
                url: `data:image/jpeg;base64,${screenshotBase64}`,
                detail: 'low',
              },
              type: 'image_url',
            },
          ],
          role: 'user',
        },
      ],
      model: 'gpt-4-turbo',
      max_tokens: 1500,
    };

    return this.http.post(this.apiUrl, payload, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
