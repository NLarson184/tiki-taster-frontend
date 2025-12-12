import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bar } from '../models/bar';
import { Drink } from '../models/drink';
import { BarSearchResult } from '../models/bar-search-result';

@Injectable({
  providedIn: 'root',
})
export class BarService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllBars(): Observable<Bar[]> {
    return this.http.get<Bar[]>(`${this.baseUrl}/bars`);
  }

  getBarDetails(bar_id: string): Observable<Bar> {
    return this.http.get<Bar>(`${this.baseUrl}/bars/${bar_id}`);
  }

  getDrinksAtBar(bar_id: string): Observable<Drink[]> {
    console.log('getting drinks at bar');
    return this.http.get<Drink[]>(`${this.baseUrl}/bars/${bar_id}/drinks`);
  }

  searchBarName(searchTerm: string): Observable<BarSearchResult[]> {
    let params = new HttpParams().set('name', searchTerm);

    return this.http.get<BarSearchResult[]>(`${this.baseUrl}/bars/search`, {
      params: params,
    });
  }
}
