import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterHeaderComponent } from './promoter-header.component';

describe('PromoterHeaderComponent', () => {
  let component: PromoterHeaderComponent;
  let fixture: ComponentFixture<PromoterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoterHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromoterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
