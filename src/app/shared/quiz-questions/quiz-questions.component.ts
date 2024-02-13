import {Component, OnInit} from '@angular/core';
import {ProfileQuizService} from "../../service/profile-quiz/profile-quiz.service";
import {PageQuestionResponse} from "../../model/profile-quiz-model";
import {list} from "postcss";
import { QuizJobSeekerService } from '../../service/jobSeeker/quiz-job-seeker/quiz-job-seeker.service';
import { formatDate } from '@angular/common';
import { JobSeeker } from '../../model/jobSeeker.model';

@Component({
  selector: 'quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent implements OnInit {

//: CALL THE QUESTIONS QUIZ PROFILE SERVICE SO WE CAN GET ALL QUESTIONS RELATED TO THE QUIZ PROFILE
  listOfQuestions!: PageQuestionResponse;
  questionNumber: number = 0;
  answers: any[] = [];
  score: number = 0;
  showResult!: boolean;
  validated!: boolean;
  JobSeekerLogged!:JobSeeker;

  constructor(private ProfileQuizService: ProfileQuizService,private quizJobSeekerService:QuizJobSeekerService) {
  }

  ngOnInit(): void {
    this.loadQuestions();

  }
  loadQuestions(): void {
    this.ProfileQuizService.getQuizzesReleatedToProfile(1, new Map()).subscribe(
      (data) => {
        this.listOfQuestions = data;
        console.log(this.listOfQuestions);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  nextQuestion(event: any) {
    this.answers.push(event);

    if (this.questionNumber === this.listOfQuestions.content.length-1) {
      this.countScore();
      this.showFinalQuizResult();
    }

    this.questionNumber++;
  }

  showFinalQuizResult() {
    //todo:get jobsekeer from  the token
    const jobseekerlogged=1;
    const currentDate: Date = new Date();
    const formattedDate = this.formatDateToString(currentDate);

    const percentageofsucces:number=(this.score / this.listOfQuestions.content.length) * 100;

    if(this.score >= 70){
       this.showResult = true;
       this.validated = true;
      }else{
      this.showResult = false;
      this.validated = true;
    }

    this.quizJobSeekerService.sendQuizResult(jobseekerlogged, formattedDate, this.validated)
    .subscribe(
      (response) => {
        console.log("Quiz result sent to backend successfully", response);
      },
      (error) => {
        console.error("Error sending quiz result to backend", error);
        // Handle error if needed
      }
    );
  }


  restartQuiz() {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() ;

    //const attemptDate = this.JobSeekerLogged.lastExamPassedDate.getMonth() ;
    const attemptDate = 3
        if (this.JobSeekerLogged.PassedExams == 3 && attemptDate == currentMonth) {
          console.log("You have already attempted 3 exams this month.");

        }  if (this.JobSeekerLogged.PassedExams == 3 && attemptDate != currentMonth) {
             this.quizJobSeekerService.countAttemptsToZero(this.JobSeekerLogged.id);
          console.log("You can restart the quiz");
          this.loadQuestions();


         } else {
          console.log("You can restart the quiz.");
          this.loadQuestions();

        }
      };


  private countScore() {
    this.answers.forEach(answer => {
      console.log(answer)
      if (answer.iscorrect === true) {
        this.score++;
      }
    });
       console.log(this.score)

  }
  formatDateToString(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
}
