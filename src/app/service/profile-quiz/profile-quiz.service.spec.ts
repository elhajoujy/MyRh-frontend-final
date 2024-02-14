import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileQuizService } from './profile-quiz.service';
import { PageQuestionResponse } from '../../model/profile-quiz-model';

describe('ProfileQuizService', () => {
  let service: ProfileQuizService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileQuizService]
    });
    service = TestBed.inject(ProfileQuizService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get quizzes related to profile', () => {
    const profileId = 1;
    const params = new Map<string, string>();
    params.set('page', '1');

    const mockResponse: PageQuestionResponse = {
      content: [],
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true,
      number: 1,
      size: 2,
      numberOfElements: 0,
      empty: true,
      pageable: {
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        offset: 0,
        pageNumber: 1,
        pageSize: 2,
        paged: true,
        unpaged: false
      },
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      }
    };

    service.getQuizzesReleatedToProfile(profileId, params).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const url = `${service['baseUrl']}/${profileId}/quizzes?page=1&size=2`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
