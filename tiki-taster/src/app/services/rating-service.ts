import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewRating, Rating } from '../models/rating';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { AuthStore } from './auth-store';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);

  getAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}/ratings`);
  }

  createRating(newRating: NewRating): Observable<any> {
    console.log('trying to create mai tai');
    const token = this.authStore.getAccessToken();

    // This is where a real Interceptor would take over.
    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log('sending the request');
    return this.http.post(`${this.baseUrl}/ratings/`, newRating, {
      headers: headers,
    });
  }
}
