import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Money } from './money';

describe('Money', () => {
  let component: Money;
  let fixture: ComponentFixture<Money>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Money]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Money);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
