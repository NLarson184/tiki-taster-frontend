import { Bar } from './bar';
import { Rating } from './rating';
import { Tag } from './tag';

export interface Drink {
    id: number;
    name: String;
    bar: Bar;
    ratings: Rating[];
    tags: Tag[];
}