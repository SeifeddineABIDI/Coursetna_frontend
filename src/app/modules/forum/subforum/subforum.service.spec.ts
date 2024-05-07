import { TestBed } from '@angular/core/testing';

import { SubforumService } from './subforum.service';

describe('SubforumService', () => {
  let service: SubforumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubforumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
