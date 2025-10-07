import { Bar } from './bar';
import { Rating } from './rating';

export interface Drink {
    id: number;
    name: String;
    bar: Bar;
    ratings: Rating[];
}