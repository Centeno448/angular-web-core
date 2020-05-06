import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookExchangeEditComponent } from './book-exchange-edit.component';

describe('BookExchangeEditComponent', () => {
  let component: BookExchangeEditComponent;
  let fixture: ComponentFixture<BookExchangeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookExchangeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookExchangeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
