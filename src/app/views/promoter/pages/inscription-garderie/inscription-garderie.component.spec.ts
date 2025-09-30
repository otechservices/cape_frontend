import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionGarderieComponent } from './inscription-garderie.component';

describe('InscriptionGarderieComponent', () => {
  let component: InscriptionGarderieComponent;
  let fixture: ComponentFixture<InscriptionGarderieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionGarderieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscriptionGarderieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
