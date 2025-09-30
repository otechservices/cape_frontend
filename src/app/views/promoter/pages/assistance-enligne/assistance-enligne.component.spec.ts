import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceEnligneComponent } from './assistance-enligne.component';

describe('AssistanceEnligneComponent', () => {
  let component: AssistanceEnligneComponent;
  let fixture: ComponentFixture<AssistanceEnligneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceEnligneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssistanceEnligneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
