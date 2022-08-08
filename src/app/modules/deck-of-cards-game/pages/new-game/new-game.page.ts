import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  PLAYER_ONE_KEY,
  PLAYER_TWO_KEY,
  SHUFFLE_KEY,
} from '@deck-of-cards-module/constants/deck.constants';
import { DeckService } from '@deck-of-cards-module/services/deck.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGamePage implements OnInit {
  public readonly newGameForm = this.formBuilder.group({
    playerOne: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^\w+$/),
      ],
    ],
    playerTwo: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^\w+$/),
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private deckService: DeckService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {}

  startNewGame() {
    this.deckService
      .newShuffle()
      .pipe(finalize(() => this.cd.detectChanges()))
      .subscribe((response) => {
        localStorage.setItem(SHUFFLE_KEY, JSON.stringify(response));
        localStorage.setItem(
          PLAYER_ONE_KEY,
          this.newGameForm.controls?.['playerOne']?.value
        );
        localStorage.setItem(
          PLAYER_TWO_KEY,
          this.newGameForm.controls?.['playerTwo']?.value
        );
        this.router.navigate(['play-game']);
      });
  }
}
