import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gencode } from './gencode';

describe('Gencode', () => {
  let component: Gencode;
  let fixture: ComponentFixture<Gencode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gencode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gencode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
