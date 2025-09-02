import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBillingComponent } from './type-billing.component';

describe('TypeBillingComponent', () => {
  let component: TypeBillingComponent;
  let fixture: ComponentFixture<TypeBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
