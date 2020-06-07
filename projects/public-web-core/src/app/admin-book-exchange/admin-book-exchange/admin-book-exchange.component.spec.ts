import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookExchangeComponent } from './admin-book-exchange.component';

describe('AdminBookExchangeComponent', () => {
  let component: AdminBookExchangeComponent;
  let fixture: ComponentFixture<AdminBookExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookExchangeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
