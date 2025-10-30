import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarInput } from './bar-input';

describe('BarInput', () => {
  let component: BarInput;
  let fixture: ComponentFixture<BarInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
