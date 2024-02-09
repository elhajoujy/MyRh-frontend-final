import { TestBed } from '@angular/core/testing';

import { QuizJobSeekerService } from './quiz-job-seeker.service';

describe('QuizJobSeekerService', () => {
  let service: QuizJobSeekerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizJobSeekerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
