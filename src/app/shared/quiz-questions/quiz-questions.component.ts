import {Component, OnInit} from '@angular/core';
import {ProfileQuizService} from "../../service/profile-quiz/profile-quiz.service";
import {PageQuestionResponse} from "../../model/profile-quiz-model";
import {list} from "postcss";

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
  showResult: boolean = false;

  constructor(private ProfileQuizService: ProfileQuizService) {
  }

  ngOnInit(): void {
    this.ProfileQuizService.getQuizzesReleatedToProfile(1, new Map()).subscribe(
      (data) => {
        this.listOfQuestions = data;
        console.log(this.listOfQuestions)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  nextQuestion(event: any) {
    //: implement the logic to go to the next question
    if (this.questionNumber === this.listOfQuestions.content.length) {
      //TODO: the user has finished the quiz WE MUST VERIFY THE ANSWERS AND SEND THEM TO THE BACKEND ALSO SHOW THE RESULT
      this.countScore();
      this.showFinalQuizResult();
    }
    this.questionNumber++;
    this.answers.push(event);
  }

  showFinalQuizResult() {
    this.showResult = true;
    console.log(this.answers)
  }


  restartQuiz() {
    // todo the user want to restart the quiz ( he only has 3 try every month ) check that before he restart the quiz
    console.log("restart the quiz")
  }

  private countScore() {
    //todo: implement the logic to count the score
    console.log(this.answers)
  }
}
