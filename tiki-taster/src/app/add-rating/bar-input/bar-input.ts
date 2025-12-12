import { Component, inject, output } from '@angular/core';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { BarService } from '../../services/bar-service';
import { AsyncPipe } from '@angular/common';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap, tap } from 'rxjs';
import { BarSearchResult } from '../../models/bar-search-result';

@Component({
  selector: 'app-bar-input',
  imports: [AsyncPipe, MatLabel, MatOption, MatAutocompleteModule, MatInputModule],
  templateUrl: './bar-input.html',
  styleUrl: './bar-input.scss',
})
export class BarInput {
  selectedBar = output<BarSearchResult>();

  private barService = inject(BarService);

  // Bar search input details
  private searchTerms = new Subject<string>();
  filteredBars$: Observable<BarSearchResult[]>;
  isLoadingBars = false;

  constructor() {
    // When the bar search term changes
    this.filteredBars$ = this.searchTerms.pipe(
      tap(() => (this.isLoadingBars = true)),
      // Wait 500ms after the last keystroke
      debounceTime(500),

      // Ignore search if it hasn't changed
      distinctUntilChanged(),

      // Send the request to the backend (cancel old request if it hasn't returned)
      switchMap((term: string) => this.barService.searchBarName(term)),
      tap(() => (this.isLoadingBars = false))
    );
  }

  onBarSearchInputChange(term: string): void {
    // Only push if the term isn't empty and greater than 2 characters
    if (term || term.length < 2) {
      this.searchTerms.next(term);
    }
  }

  onBarSelected(selectedBar: BarSearchResult): void {
    this.selectedBar.emit(selectedBar);
  }

  barDisplayFn(barSearchResult: BarSearchResult): string {
    return barSearchResult && barSearchResult.name ? barSearchResult.name : '';
  }
}
