import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddRating } from './add-rating/add-rating';
import { authGuard } from './guards/auth-guard';
import { Search } from './search/search';
import { BarComponent } from './bar/bar';
import { MyLists } from './my-lists/my-lists';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search', component: Search },
  { path: 'bars/:id', component: BarComponent },
  { path: 'add-rating', component: AddRating, canMatch: [authGuard] },
  { path: 'my-lists', component: MyLists, canMatch: [authGuard] },
];
