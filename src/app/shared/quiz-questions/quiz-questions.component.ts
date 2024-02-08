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

  constructor(
    private ProfileQuizService: ProfileQuizService
  ) {
  }

  ngOnInit(): void {
    this.ProfileQuizService.getQuizzesReleatedToProfile(1, new Map()).subscribe(
      (data) => {
        this.listOfQuestions = data;
        console.log(this.listOfQuestions)
      }
      ,
      (error) => {
        console.log(error);
      }
    )
  }

  nextQuestion() {
    //todo: implement the logic to go to the next question
    this.questionNumber++;
  }


  protected readonly list = list;
}
