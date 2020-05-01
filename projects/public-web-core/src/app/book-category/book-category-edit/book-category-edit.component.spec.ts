import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoryEditComponent } from './book-category-edit.component';

describe('BookCategoryEditComponent', () => {
  let component: BookCategoryEditComponent;
  let fixture: ComponentFixture<BookCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
