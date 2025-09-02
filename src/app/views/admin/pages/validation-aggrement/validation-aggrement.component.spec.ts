import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAggrementComponent } from './validation-aggrement.component';

describe('ValidationAggrementComponent', () => {
  let component: ValidationAggrementComponent;
  let fixture: ComponentFixture<ValidationAggrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationAggrementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationAggrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
