import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonComponent } from './abandon.component';

describe('AbandonComponent', () => {
  let component: AbandonComponent;
  let fixture: ComponentFixture<AbandonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbandonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbandonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
