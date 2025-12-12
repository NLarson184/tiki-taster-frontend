import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutForm } from './logout-form';

describe('LogoutForm', () => {
  let component: LogoutForm;
  let fixture: ComponentFixture<LogoutForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
