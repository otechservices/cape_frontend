import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionCapeComponent } from './inscription-cape.component';

describe('InscriptionCapeComponent', () => {
  let component: InscriptionCapeComponent;
  let fixture: ComponentFixture<InscriptionCapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionCapeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscriptionCapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
