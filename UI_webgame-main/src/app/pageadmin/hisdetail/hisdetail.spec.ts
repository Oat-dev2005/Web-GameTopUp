import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hisdetail } from './hisdetail';

describe('Hisdetail', () => {
  let component: Hisdetail;
  let fixture: ComponentFixture<Hisdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hisdetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hisdetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
