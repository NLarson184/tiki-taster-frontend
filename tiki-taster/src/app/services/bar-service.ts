import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bar } from '../models/bar';
import { Drink } from '../models/drink';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllBars(): Observable<Bar[]> {
    return this.http.get<Bar[]>(`${this.baseUrl}/bars`);
  }

  getDrinksAtBar(barId: number): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.baseUrl}/bars/${barId}/drinks`);
  }
}
