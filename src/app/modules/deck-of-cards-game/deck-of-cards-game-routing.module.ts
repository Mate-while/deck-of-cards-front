import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGamePage } from '@deck-of-cards-module/pages/new-game/new-game.page';
import { PlayGamePage } from '@deck-of-cards-module/pages/play-game/play-game.page';

const routes: Routes = [
  {
    path: 'new-game',
    component: NewGamePage,
  },
  {
    path: 'play-game',
    component: PlayGamePage,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'new-game',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeckOfCardsGameRoutingModule {}
