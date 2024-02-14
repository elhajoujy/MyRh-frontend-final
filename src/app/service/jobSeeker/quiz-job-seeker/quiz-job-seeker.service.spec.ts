import { TestBed } from '@angular/core/testing';

import { QuizJobSeekerService } from './quiz-job-seeker.service';
import { environment } from '../../../../environments/environment';

describe('QuizJobSeekerService', () => {
  let service: QuizJobSeekerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizJobSeekerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})

it('should send quiz result', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  const service = new QuizJobSeekerService(httpClientSpy);

  const jobseekerId = 1;
  const currentDate = '2024-02-14';
  const validated = true;

  service.sendQuizResult(jobseekerId, currentDate, validated);

  expect(httpClientSpy.post).toHaveBeenCalledWith(`${environment.backendHost}/myrh/api/v1/jobSeekers/results`, {
    jobseekerId: jobseekerId,
    Datepassedexam: currentDate,
    isvalidated: validated,
  });
});

;
