import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Rating } from '../models/rating';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}/ratings`);
  }
}
