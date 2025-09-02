import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSousGarderieComponent } from './type-sous-garderie.component';

describe('TypeSousGarderieComponent', () => {
  let component: TypeSousGarderieComponent;
  let fixture: ComponentFixture<TypeSousGarderieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeSousGarderieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeSousGarderieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
