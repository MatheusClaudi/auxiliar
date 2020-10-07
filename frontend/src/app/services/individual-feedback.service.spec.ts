import { TestBed } from '@angular/core/testing';

import { IndividualFeedbackService } from './individual-feedback.service';

describe('IndividualFeedbackService', () => {
  let service: IndividualFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
