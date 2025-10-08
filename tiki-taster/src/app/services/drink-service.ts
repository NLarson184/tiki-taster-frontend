import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from '../models/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.baseUrl}/drinks`);
  }

  calculateOverallRating(drink: Drink): number {
    if (drink.ratings == null || drink.ratings.length == 0) {
      return 0;
    }

    const overallRatings = drink.ratings.map(rating => rating.overall_rating) ?? [];
    const sum = overallRatings.reduce((a, c) => a + c, 0);
    return sum / overallRatings.length;
  }
}
