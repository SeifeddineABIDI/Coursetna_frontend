import { TestBed } from '@angular/core/testing';

import { ReactionService } from './reaction.service';

describe('MessageService', () => {
  let service: ReactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
