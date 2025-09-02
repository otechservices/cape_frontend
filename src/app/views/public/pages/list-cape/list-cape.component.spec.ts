import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCapeComponent } from './list-cape.component';

describe('ListCapeComponent', () => {
  let component: ListCapeComponent;
  let fixture: ComponentFixture<ListCapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
