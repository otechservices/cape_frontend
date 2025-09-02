import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableContainerComponent } from './datatable-container.component';

describe('DatatableContainerComponent', () => {
  let component: DatatableContainerComponent;
  let fixture: ComponentFixture<DatatableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
