import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageQuestionResponse} from "../../model/profile-quiz-model";


@Injectable({
  providedIn: 'root'
})
export class ProfileQuizService {

  private baseUrl = environment.backendHost + "/api/v1/profiles";

  constructor(
    private http: HttpClient
  ) {
  }


  getQuizzesReleatedToProfile(profileId: number, params: Map<String, String>): Observable<PageQuestionResponse> {

    const url = this.baseUrl + "/" + profileId + "/quizzes";
    return this.http.get(url, {
      params: params as any
    }) as Observable<PageQuestionResponse>;
  }


}
