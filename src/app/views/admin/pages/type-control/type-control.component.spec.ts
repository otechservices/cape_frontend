import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeControlComponent } from './type-control.component';

describe('TypeControlComponent', () => {
  let component: TypeControlComponent;
  let fixture: ComponentFixture<TypeControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
