import { Bar } from './bar';
import { Rating } from './rating';
import { Tag } from './tag';

export interface Drink {
    id: number;
    name: string;
    bar: Bar;
    ratings: Rating[];
    tags: Tag[];
}