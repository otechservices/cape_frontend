import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteAdminComponent } from './unite-admin.component';

describe('UniteAdminComponent', () => {
  let component: UniteAdminComponent;
  let fixture: ComponentFixture<UniteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniteAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
