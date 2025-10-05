import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gamelibrary } from './gamelibrary';

describe('Gamelibrary', () => {
  let component: Gamelibrary;
  let fixture: ComponentFixture<Gamelibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gamelibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gamelibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
