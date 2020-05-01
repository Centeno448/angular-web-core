import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoryAddComponent } from './book-category-add.component';

describe('BookCategoryAddComponent', () => {
  let component: BookCategoryAddComponent;
  let fixture: ComponentFixture<BookCategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
