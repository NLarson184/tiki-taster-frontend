import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { MediaSignature } from '../models/media-signature';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private cloudName = 'djja7zy8p';
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  // Securely upload an image using a signed upload by first requesting an authenticated signature.
  //
  // Returns a "results" object that contains "secure_url" to store in database.
  uploadImage(file: File): Observable<any> {
    return this.http.get<MediaSignature>(`${this.baseUrl}/media/signature`).pipe(
      switchMap((config: MediaSignature) => {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('api_key', config.api_key);
        formData.append('timestamp', config.timestamp);
        formData.append('signature', config.signature);
        formData.append('folder', config.folder);

        return this.http.post(this.cloudinaryUrl, formData);
      }),
    );
  }
}
