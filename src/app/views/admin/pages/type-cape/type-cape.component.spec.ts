import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCapeComponent } from './type-cape.component';

describe('TypeCapeComponent', () => {
  let component: TypeCapeComponent;
  let fixture: ComponentFixture<TypeCapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeCapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
