import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceEserviceComponent } from './espace-eservice.component';

describe('EspaceEserviceComponent', () => {
  let component: EspaceEserviceComponent;
  let fixture: ComponentFixture<EspaceEserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceEserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceEserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
