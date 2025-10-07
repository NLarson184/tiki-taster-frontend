import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkCard } from './drink-card';

describe('ReviewCard', () => {
  let component: DrinkCard;
  let fixture: ComponentFixture<DrinkCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DrinkCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
