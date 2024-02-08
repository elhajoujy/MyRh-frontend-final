import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  isQuizToBeStarted: boolean = false;


  constructor() {
  }

  ngOnInit() {
    // this.onStart();
  }

  onStart() {
    this.isQuizToBeStarted = !this.isQuizToBeStarted;
    console.log('Quiz to be started : ', this.isQuizToBeStarted)
  }
}
