import { Drink } from './drink';
import { Bar } from './bar';

export interface Rating {
    id: number;
    drink: Drink;
    bar: Bar;
    overall_rating: number;
}