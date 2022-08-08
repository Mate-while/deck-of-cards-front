import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DrawCardsResponse } from '@deck-of-cards-module/interfaces/draw-cards.response';
import { NewShuffleResponse } from '@deck-of-cards-module/interfaces/new-shuffle.response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class DeckService {
  constructor(private httpClient: HttpClient) {}

  newShuffle(deckCount: number = 1): Observable<NewShuffleResponse> {
    return this.httpClient.get<NewShuffleResponse>(
      environment.deckApiUrl + '/new/shuffle/?deck_count=' + deckCount
    );
  }

  drawCards(
    deckId: string,
    cardsCount: number = 2
  ): Observable<DrawCardsResponse> {
    return this.httpClient.get<DrawCardsResponse>(
      environment.deckApiUrl + '/' + deckId + '/draw/?count=' + cardsCount
    );
  }
}
