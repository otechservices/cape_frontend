import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterProfilComponent } from './promoter-profil.component';

describe('PromoterProfilComponent', () => {
  let component: PromoterProfilComponent;
  let fixture: ComponentFixture<PromoterProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoterProfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromoterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
