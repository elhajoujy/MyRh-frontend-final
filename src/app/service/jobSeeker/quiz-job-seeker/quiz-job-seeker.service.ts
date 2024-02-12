import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizJobSeekerService {

  constructor(private http: HttpClient) { }

  sendQuizResult(jobseekerId: number, currentDate: String, validated: boolean) {
    const endpoint = 'http://localhost:8080/myrh/api/v1/jobSeekers/results';

    let quizResultData = {
      jobseekerId: jobseekerId,
      Datepassedexam: currentDate,
      isvalidated: validated,
    };
    console.log(quizResultData)
    return this.http.post(endpoint, quizResultData);
  }}