import { Drink } from './drink';
import { Bar } from './bar';

export interface Rating {
    drink: Drink;
    bar: Bar;
    overall_rating: Number;
}