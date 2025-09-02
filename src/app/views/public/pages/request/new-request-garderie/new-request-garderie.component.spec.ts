import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestGarderieComponent } from './new-request-garderie.component';

describe('NewRequestGarderieComponent', () => {
  let component: NewRequestGarderieComponent;
  let fixture: ComponentFixture<NewRequestGarderieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRequestGarderieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRequestGarderieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
