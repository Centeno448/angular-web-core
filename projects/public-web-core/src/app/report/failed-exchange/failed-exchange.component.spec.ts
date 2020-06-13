import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedExchangeComponent } from './failed-exchange.component';

describe('FailedExchangeComponent', () => {
  let component: FailedExchangeComponent;
  let fixture: ComponentFixture<FailedExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
