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
}
