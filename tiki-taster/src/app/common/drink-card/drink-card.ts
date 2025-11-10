import { Component, input, inject, OnInit } from '@angular/core';
import { Drink } from '../../models/drink';
import { DrinkDetailDialog } from './drink-detail-dialog/drink-detail-dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DrinkService } from '../../services/drink-service';

@Component({
  selector: 'app-drink-card',
  imports: [MatButtonModule],
  templateUrl: './drink-card.html',
  styleUrl: './drink-card.scss',
})
export class DrinkCard implements OnInit {
  // Required - The drink for this card
  drink = input.required<Drink>();
  barLinkActive = input<boolean>(true);

  // The dialog popup for the drink details
  readonly dialog = inject(MatDialog);
  private drinkService = inject(DrinkService);

  // The calculated overall rating for this drink.
  // Based on the list of ratings attached to this drink.
  overallRating: string = 'Loading...';
  tasteRating: string = 'Loading...';
  presentationRating: string = 'Loading...';

  ngOnInit() {
    this.overallRating = this.drink().average_overall_rating?.toString() ?? 'N/A';
    this.tasteRating = this.drink().average_taste_rating?.toString() ?? 'N/A';
    this.presentationRating = this.drink().average_presentation_rating?.toString() ?? 'N/A';
  }

  openDetailDialog(drink: Drink): void {
    this.dialog.open(DrinkDetailDialog, {
      width: '500px',
      data: {
        drink: drink,
        barLinkActive: this.barLinkActive(),
      },
    });
  }
}
