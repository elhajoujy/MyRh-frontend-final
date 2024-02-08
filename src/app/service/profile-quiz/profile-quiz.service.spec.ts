import { TestBed } from '@angular/core/testing';

import { ProfileQuizService } from './profile-quiz.service';

describe('ProfileQuizService', () => {
  let service: ProfileQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
