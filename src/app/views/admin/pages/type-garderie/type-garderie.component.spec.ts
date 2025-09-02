import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeGarderieComponent } from './type-garderie.component';

describe('TypeGarderieComponent', () => {
  let component: TypeGarderieComponent;
  let fixture: ComponentFixture<TypeGarderieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeGarderieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeGarderieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
