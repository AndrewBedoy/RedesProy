import { TestBed } from '@angular/core/testing';

import { OpenfdaService } from './openfda.service';

describe('OpenfdaService', () => {
  let service: OpenfdaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenfdaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
