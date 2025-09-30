import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterSettingComponent } from './promoter-setting.component';

describe('PromoterSettingComponent', () => {
  let component: PromoterSettingComponent;
  let fixture: ComponentFixture<PromoterSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoterSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromoterSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
