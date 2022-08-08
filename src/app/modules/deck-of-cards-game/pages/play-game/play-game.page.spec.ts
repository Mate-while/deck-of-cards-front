import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGamePage } from './play-game.page';

describe('PlayGamePage', () => {
  let component: PlayGamePage;
  let fixture: ComponentFixture<PlayGamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayGamePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
