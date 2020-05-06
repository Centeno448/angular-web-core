import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookExchangeAddComponent } from './book-exchange-add.component';

describe('BookExchangeAddComponent', () => {
  let component: BookExchangeAddComponent;
  let fixture: ComponentFixture<BookExchangeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookExchangeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookExchangeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
