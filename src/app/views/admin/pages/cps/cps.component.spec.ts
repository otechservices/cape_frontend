import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpsComponent } from './cps.component';

describe('CpsComponent', () => {
  let component: CpsComponent;
  let fixture: ComponentFixture<CpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
