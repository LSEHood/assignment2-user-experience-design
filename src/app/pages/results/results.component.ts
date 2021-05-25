import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

	results = ["hello from components", "test 1", "test 2", "test 3"];
  constructor() { }

  ngOnInit(): void {
  }

}
