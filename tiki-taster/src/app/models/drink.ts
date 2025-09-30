import { Bar } from './bar';
import { Rating } from './rating';

export interface Drink {
    name: String;
    bar: Bar;
    ratingList: Rating[];
}