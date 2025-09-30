import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonProfilPromoterComponent } from './mon-profil-promoter.component';

describe('MonProfilPromoterComponent', () => {
  let component: MonProfilPromoterComponent;
  let fixture: ComponentFixture<MonProfilPromoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonProfilPromoterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonProfilPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
