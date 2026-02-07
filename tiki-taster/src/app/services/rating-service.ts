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

  getAccountRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}/ratings/mine`);
  }

  createRating(newRating: NewRating): Observable<any> {
    // This is also enforced on the back-end
    if (!this.authStore.isAuthenticated) {
      throw new Error('Authentication token is missing.');
    }

    return this.http.post(`${this.baseUrl}/ratings/`, newRating);
  }
}
