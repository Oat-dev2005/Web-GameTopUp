import { TestBed } from '@angular/core/testing';

import { Webservice } from './webservice';

describe('Webservice', () => {
  let service: Webservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Webservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
