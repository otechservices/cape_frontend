import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHasAgreementComponent } from './request-has-agreement.component';

describe('RequestHasAgreementComponent', () => {
  let component: RequestHasAgreementComponent;
  let fixture: ComponentFixture<RequestHasAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestHasAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestHasAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
