import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowCapeComponent } from './follow-cape.component';

describe('FollowCapeComponent', () => {
  let component: FollowCapeComponent;
  let fixture: ComponentFixture<FollowCapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowCapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowCapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
