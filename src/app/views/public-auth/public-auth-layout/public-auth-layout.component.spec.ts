import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAuthLayoutComponent } from './public-auth-layout.component';

describe('PublicAuthLayoutComponent', () => {
  let component: PublicAuthLayoutComponent;
  let fixture: ComponentFixture<PublicAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicAuthLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
