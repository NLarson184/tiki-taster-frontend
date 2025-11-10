import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarService } from '../services/bar-service';
import { Bar } from '../models/bar';
import { DrinkCard } from '../common/drink-card/drink-card';
import { Drink } from '../models/drink';
import { DrinkService } from '../services/drink-service';

@Component({
  selector: 'app-bar',
  imports: [DrinkCard],
  templateUrl: './bar.html',
  styleUrl: './bar.scss',
})
export class BarComponent {
  barDetails = signal<Bar | null>(null);
  drinksAtBar = signal<Drink[]>([]);

  private activatedRoute = inject(ActivatedRoute);
  private barService = inject(BarService);
  private drinkService = inject(DrinkService);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.loadBarDetails(parseInt(params['id']));
    });
  }

  private loadBarDetails(barId: number) {
    if (barId == Number.NaN) {
      return;
    }

    // Get the basic details of the bar
    this.barService.getBarDetails(barId).subscribe((bar) => {
      this.barDetails.set(bar);
    });

    // Get the drink list for this bar
    this.barService.getDrinksAtBar(barId).subscribe((drinks) => {
      this.drinksAtBar.set(drinks);
    });
  }
}
