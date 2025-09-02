import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceEserviceEditComponent } from './espace-eservice-edit.component';

describe('EspaceEserviceEditComponent', () => {
  let component: EspaceEserviceEditComponent;
  let fixture: ComponentFixture<EspaceEserviceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceEserviceEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceEserviceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
