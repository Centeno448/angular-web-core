import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookExchangeComponent } from './book-exchange.component';

describe('BookExchangeComponent', () => {
  let component: BookExchangeComponent;
  let fixture: ComponentFixture<BookExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
