import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookExchangeAddComponent } from './admin-book-exchange-add.component';

describe('AdminBookExchangeAddComponent', () => {
  let component: AdminBookExchangeAddComponent;
  let fixture: ComponentFixture<AdminBookExchangeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookExchangeAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookExchangeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
