import {Component, OnInit} from '@angular/core';
import {ProfileQuizService} from "../../service/profile-quiz/profile-quiz.service";
import {PageQuestionResponse} from "../../model/profile-quiz-model";
import {list} from "postcss";
import {QuizJobSeekerService} from '../../service/jobSeeker/quiz-job-seeker/quiz-job-seeker.service';
import {DatePipe, formatDate} from '@angular/common';
import {JobSeeker} from '../../model/jobSeeker.model';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {applicantRefersh} from "../../store/applicant/applicant.action";
import swal from "sweetalert2";


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
  JobSeekerLogged!: JobSeeker | null;
  applicant!: JobSeeker | null;
  isLogged!: boolean | null;
  message: string = 'No questions found.';

  constructor(
    private ProfileQuizService: ProfileQuizService,
    private quizJobSeekerService: QuizJobSeekerService,
    private store: Store<AppState>,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.store
      .select('applicantAuth')
      .subscribe(
        (state) => (
          (this.applicant = state.applicant),
            (this.JobSeekerLogged = state.applicant),
            (this.isLogged = state.isLogged),
            console.log('Applicant : ', state.applicant)

        )
      );

    if (this.applicant) {
      if (this.applicant?.passedExams >= 3 && this.datePipe.transform(this.applicant?.lastExamPassedDate, 'MM') == this.datePipe.transform(new Date(), 'MM')) {
        console.log("You have already attempted 3 exams this month.");
        this.message = "You have already attempted 3 exams this month.";
        return;
      }
      this.loadQuestions();
    }

  }

  loadQuestions(): void {
    let parms = new Map();
    parms.set('page', this.applicant?.passedExams);
    this.ProfileQuizService.getQuizzesReleatedToProfile(this.applicant?.profile.id, parms).subscribe(
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

    if (this.questionNumber === this.listOfQuestions.content.length - 1) {
      if (this.isLogged) {
        this.countScore();
        this.showFinalQuizResult();
      } else {
        console.log("You are not logged in");
      }
    }

    this.questionNumber++;
  }

  showFinalQuizResult() {
    //:get jobsekeer from  the token
    let jobseekerlogged = 0;
    if (this.applicant) {
      jobseekerlogged = this.applicant.id;
    } else {
      console.log("You are not logged in");
      return;
    }
    const currentDate: Date = new Date();
    const formattedDate = this.formatDateToString(currentDate);

    const percentageofsucces: number = (this.score / this.listOfQuestions.content.length) * 100;
    console.log(percentageofsucces)


    if (percentageofsucces >= 70) {
      this.showResult = true;
      this.validated = true;

      //:show popup message with the user information and the result
      swal.fire({
        title: `Good job! You passed the quiz! ${percentageofsucces}% of success ${this.applicant?.first_name} ${this.applicant?.last_name}!`,
        text: "Thank you for taking the quiz. You can now apply for the job.",
        icon: "success"
      });
    } else {
      this.showResult = false;
      this.validated = false;
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
    if (this.isLogged) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.store.dispatch(applicantRefersh({jobSeeker: this.applicant, isLogged: this.isLogged}));

  }


  restartQuiz() {

    if (!this.JobSeekerLogged) {
      //todo: redirect to login page
      console.log("You are not logged in");
      return;
    }
    this.showResult = false;
    let currentDate = new Date();
    const currentMonth = this.datePipe.transform(currentDate, 'MM');
    const attemptDate = this.datePipe.transform(this.JobSeekerLogged?.lastExamPassedDate, 'MM');
    console.log(attemptDate)

    if (this.JobSeekerLogged?.passedExams >= 3 && attemptDate == currentMonth) {
      console.log("You have already attempted 3 exams this month.");
      return;

    }
    if (this.JobSeekerLogged?.passedExams == 3 && attemptDate != currentMonth) {
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
