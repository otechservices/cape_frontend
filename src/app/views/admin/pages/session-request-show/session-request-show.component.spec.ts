import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRequestShowComponent } from './session-request-show.component';

describe('SessionRequestShowComponent', () => {
  let component: SessionRequestShowComponent;
  let fixture: ComponentFixture<SessionRequestShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionRequestShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionRequestShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
