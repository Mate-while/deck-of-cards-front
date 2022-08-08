import { CardModel } from './card.model';

export interface DrawCardsResponse {
  success: boolean;
  cards: CardModel[];
  deck_id: string;
  remaining: number;
}
