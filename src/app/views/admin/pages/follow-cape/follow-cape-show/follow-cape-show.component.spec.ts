import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowCapeShowComponent } from './follow-cape-show.component';

describe('FollowCapeShowComponent', () => {
  let component: FollowCapeShowComponent;
  let fixture: ComponentFixture<FollowCapeShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowCapeShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowCapeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
