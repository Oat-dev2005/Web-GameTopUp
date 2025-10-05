import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detailadmin } from './detailadmin';

describe('Detailadmin', () => {
  let component: Detailadmin;
  let fixture: ComponentFixture<Detailadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detailadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Detailadmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
