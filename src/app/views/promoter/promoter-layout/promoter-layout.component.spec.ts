import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterLayoutComponent } from './promoter-layout.component';

describe('PromoterLayoutComponent', () => {
  let component: PromoterLayoutComponent;
  let fixture: ComponentFixture<PromoterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoterLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromoterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
