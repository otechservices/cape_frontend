import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestGarderieComponent } from './update-request-garderie.component';

describe('UpdateRequestGarderieComponent', () => {
  let component: UpdateRequestGarderieComponent;
  let fixture: ComponentFixture<UpdateRequestGarderieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequestGarderieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRequestGarderieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
