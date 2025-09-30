import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddRating } from './add-rating/add-rating';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'add-rating', component: AddRating }
];
