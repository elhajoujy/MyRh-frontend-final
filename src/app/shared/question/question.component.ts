import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer, Question} from "../../model/profile-quiz-model";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question | undefined;
  @Output() nextQuestion = new EventEmitter<any>();
  selectedAnswer!: Answer;


  ngOnInit() {


  }

  onNextClick() {
    console.log("next question" + this.question?.id)
    console.log("call the parent to change the question but first send you answer")
    this.nextQuestion.emit({questionId: this.question?.id, answer: this.selectedAnswer.id,iscorrect:this.selectedAnswer.correct});
  }

  onAnswerChange(answer: Answer ) {
    console.log(answer)
    this.selectedAnswer = answer;
  }
}
