import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addgame } from './addgame';

describe('Addgame', () => {
  let component: Addgame;
  let fixture: ComponentFixture<Addgame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addgame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addgame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
