import { Component, effect, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DrinkCard } from '../common/drink-card/drink-card';
import { Observable } from 'rxjs';
import { DrinkService } from '../services/drink-service';
import { Drink } from '../models/drink';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, DrinkCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  drinkList$!: Observable<Drink[]>;

  private drinkService = inject(DrinkService);

  constructor() {
    effect(() => {
      this.drinkList$ = this.drinkService.getAllDrinks();
    });
  }
}
