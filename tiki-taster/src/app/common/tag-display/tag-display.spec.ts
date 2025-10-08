import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDisplay } from './tag-display';

describe('TagDisplay', () => {
  let component: TagDisplay;
  let fixture: ComponentFixture<TagDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
