import { ListBoard } from './ListBoard';

export class Board {
  id: number;
  name: string;
  sprint: string;
  date: string;
  lists: Array<ListBoard>;
}
