import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAvisComponent } from './type-avis.component';

describe('TypeAvisComponent', () => {
  let component: TypeAvisComponent;
  let fixture: ComponentFixture<TypeAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAvisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
