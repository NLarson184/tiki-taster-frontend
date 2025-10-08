import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkDetailDialog } from './drink-detail-dialog';

describe('DrinkDetailDialog', () => {
  let component: DrinkDetailDialog;
  let fixture: ComponentFixture<DrinkDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkDetailDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinkDetailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
