import { TestBed } from '@angular/core/testing';

import { FilmDetailsService } from './film-details-service';

describe('FilmDetailsService', () => {
  let service: FilmDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
