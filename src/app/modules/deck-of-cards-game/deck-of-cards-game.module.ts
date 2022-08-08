import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewGamePage } from '@deck-of-cards-module/pages/new-game/new-game.page';
import { PlayGamePage } from '@deck-of-cards-module/pages/play-game/play-game.page';
import { DeckOfCardsGameRoutingModule } from '@deck-of-cards-module/deck-of-cards-game-routing.module';

import { DeckService } from '@deck-of-cards-module/services/deck.service';

@NgModule({
  declarations: [NewGamePage, PlayGamePage],
  imports: [
    CommonModule,
    DeckOfCardsGameRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DeckService],
})
export class DeckOfCardsGameModule {}
