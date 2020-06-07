import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookExchangeEditComponent } from './admin-book-exchange-edit.component';

describe('AdminBookExchangeEditComponent', () => {
  let component: AdminBookExchangeEditComponent;
  let fixture: ComponentFixture<AdminBookExchangeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookExchangeEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookExchangeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
