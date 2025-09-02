import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPaginatorContainerComponent } from './search-paginator-container.component';

describe('SearchPaginatorContainerComponent', () => {
  let component: SearchPaginatorContainerComponent;
  let fixture: ComponentFixture<SearchPaginatorContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPaginatorContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPaginatorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
