import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFileComponent } from './type-file.component';

describe('TypeFileComponent', () => {
  let component: TypeFileComponent;
  let fixture: ComponentFixture<TypeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
