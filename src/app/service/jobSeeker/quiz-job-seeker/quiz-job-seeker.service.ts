import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizJobSeekerService {

  constructor(private http: HttpClient) { }
   endpoint= "http://localhost:8080/myrh/api/v1/jobSeekers"

  sendQuizResult(jobseekerId: number, currentDate: String, validated: boolean) {

    let quizResultData = {
      jobseekerId: jobseekerId,
      Datepassedexam: currentDate,
      isvalidated: validated,
    };
    console.log(quizResultData)
    return this.http.post(this.endpoint+"/results", quizResultData);
  }

  countAttemptsToZero(jobseekerId: number) {

    return this.http.get(`${this.endpoint}/${jobseekerId}/resetAttempts`);
  }
}
