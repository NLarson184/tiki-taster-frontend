import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorContainer } from './error-container';

describe('ErrorContainer', () => {
  let component: ErrorContainer;
  let fixture: ComponentFixture<ErrorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
