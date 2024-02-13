import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuizJobSeekerService {

  constructor(private http: HttpClient) {
  }

  sendQuizResult(jobseekerId: number, currentDate: String, validated: boolean) {
    // http://localhost:8080/
    const endpoint = `${environment.backendHost}/myrh/api/v1/jobSeekers/results`;

    let quizResultData = {
      jobseekerId: jobseekerId,
      Datepassedexam: currentDate,
      isvalidated: validated,
    };
    console.log(quizResultData)
    return this.http.post(endpoint, quizResultData);
  }
}
