import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-analysis-view',
  templateUrl: './nav-analysis-view.component.html',
  styleUrls: ['./nav-analysis-view.component.css']
})
export class NavAnalysisViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Navigate to Analysis View")
  }

}
