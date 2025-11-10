import { Component, effect, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DrinkCard } from '../common/drink-card/drink-card';
import { Observable } from 'rxjs';
import { DrinkService } from '../services/drink-service';
import { Drink } from '../models/drink';
import { HOME_PAGE_HEADERS } from '../common/constants';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, DrinkCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  drinkList$!: Observable<Drink[]>;

  private drinkService = inject(DrinkService);

  currentHeader: string;

  constructor() {
    effect(() => {
      this.drinkList$ = this.drinkService.getAllDrinks();
    });

    this.currentHeader = HOME_PAGE_HEADERS[Math.floor(Math.random() * HOME_PAGE_HEADERS.length)];
  }
}
