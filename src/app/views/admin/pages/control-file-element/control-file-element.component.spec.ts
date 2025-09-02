import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFileElementComponent } from './control-file-element.component';

describe('ControlFileElementComponent', () => {
  let component: ControlFileElementComponent;
  let fixture: ComponentFixture<ControlFileElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlFileElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlFileElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
