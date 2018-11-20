import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-map-view',
  templateUrl: './nav-map-view.component.html',
  styleUrls: ['./nav-map-view.component.css']
})
export class NavMapViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Navigate to Map")
  }

}
