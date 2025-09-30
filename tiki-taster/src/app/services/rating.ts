import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Rating {
  url = 'https://api.tikitaster.com/ratings'

  async getAllRatings(): Promise<Rating[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}
