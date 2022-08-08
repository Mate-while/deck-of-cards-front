import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PLAYER_ONE_KEY,
  PLAYER_TWO_KEY,
  SHUFFLE_KEY,
  SUIT_VALUES,
} from '@deck-of-cards-module/constants/deck.constants';
import { CardModel } from '@deck-of-cards-module/interfaces/card.model';
import { NewShuffleResponse } from '@deck-of-cards-module/interfaces/new-shuffle.response';
import { DeckService } from '@deck-of-cards-module/services/deck.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.page.html',
  styleUrls: ['./play-game.page.scss'],
})
export class PlayGamePage implements OnInit {
  playerOne?: string | null;
  playerTwo?: string | null;

  playerOneCards: CardModel[] = [];
  playerTwoCards: CardModel[] = [];

  hasWinner: boolean = false;
  winner: string = '';

  winnerCards: CardModel[] = [];

  shuffle?: NewShuffleResponse | null;

  constructor(
    private router: Router,
    private deckService: DeckService,
    private cd: ChangeDetectorRef
  ) {
    this.playerOne = localStorage.getItem(PLAYER_ONE_KEY);
    this.playerTwo = localStorage.getItem(PLAYER_TWO_KEY);
    this.shuffle = localStorage.getItem(SHUFFLE_KEY)
      ? JSON.parse(localStorage.getItem(SHUFFLE_KEY) || '')
      : null;

    if (!this.playerOne || !this.playerTwo || !this.shuffle?.deck_id) {
      localStorage.clear();
      this.router.navigate(['new-game']);
    }
  }

  ngOnInit(): void {}

  getCards() {
    this.deckService
      .drawCards(this.shuffle?.deck_id || '', 2)
      .pipe(finalize(() => this.cd.detectChanges()))
      .subscribe((response) => {
        if (response?.cards?.length == 2) {
          const duplicatePlayerOne = this.playerOneCards.find(
            (card) => card.value == response.cards[0].value
          );
          const duplicatePlayerTwo = this.playerTwoCards.find(
            (card) => card.value == response.cards[1].value
          );
          if (
            (duplicatePlayerOne &&
              duplicatePlayerTwo &&
              SUIT_VALUES[response.cards[0].suit] >=
                SUIT_VALUES[response.cards[1].suit]) ||
            (duplicatePlayerOne && !duplicatePlayerTwo) ) {
            this.hasWinner = true;
            this.winner = this.playerOne || '';
            this.winnerCards = [duplicatePlayerOne, response.cards[0]];
          } else if (
            (duplicatePlayerOne &&
              duplicatePlayerTwo &&
              SUIT_VALUES[response.cards[0].suit] <
                SUIT_VALUES[response.cards[1].suit]) ||
            duplicatePlayerTwo
          ) {
            this.hasWinner = true;
            this.winner = this.playerTwo || '';
            this.winnerCards = [duplicatePlayerTwo, response.cards[1]];
          }
          this.playerOneCards.push(response.cards[0]);
          this.playerTwoCards.push(response.cards[1]);
        }
      });
  }

  newGame() {
    localStorage.clear();
    this.router.navigate(['new-game']);
  }
}
