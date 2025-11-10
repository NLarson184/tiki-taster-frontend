import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddRating } from './add-rating/add-rating';
import { authGuard } from './auth-guard';
import { Search } from './search/search';
import { BarComponent } from './bar/bar';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search', component: Search },
  { path: 'bars/:id', component: BarComponent },
  { path: 'add-rating', component: AddRating, canMatch: [authGuard] },
];
