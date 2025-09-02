import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualityDetailsComponent } from './actuality-details.component';

describe('ActualityDetailsComponent', () => {
  let component: ActualityDetailsComponent;
  let fixture: ComponentFixture<ActualityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualityDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
