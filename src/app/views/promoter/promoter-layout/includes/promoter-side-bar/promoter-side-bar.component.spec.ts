import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterSideBarComponent } from './promoter-side-bar.component';

describe('PromoterSideBarComponent', () => {
  let component: PromoterSideBarComponent;
  let fixture: ComponentFixture<PromoterSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoterSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromoterSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
