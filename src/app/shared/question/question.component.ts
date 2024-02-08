import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../model/profile-quiz-model";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question | undefined;


  ngOnInit() {


  }

  onNextClick() {
    console.log("next question" + this.question?.id)
    console.log("call the parent to change the question but first send you answer")
  }

  onAnswerChange(value: any) {
    console.log(value)
  }
}
