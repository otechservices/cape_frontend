import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturePromotorComponent } from './nature-promotor.component';

describe('NaturePromotorComponent', () => {
  let component: NaturePromotorComponent;
  let fixture: ComponentFixture<NaturePromotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturePromotorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaturePromotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
