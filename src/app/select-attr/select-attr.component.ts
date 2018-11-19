import { Component, OnInit } from '@angular/core';
import {YEARS} from '../constants';

@Component({
  selector: 'app-select-attr',
  templateUrl: './select-attr.component.html',
  styleUrls: ['./select-attr.component.css']
})
export class SelectAttrComponent implements OnInit {

  constructor() { }
  listOfOption = [];
  listOfTagOptions = [];

  ngOnInit(): void {
    const children = [];
    YEARS.forEach(year => {
      children.push({ label: year, value: year });
    })
    this.listOfOption = children;
  }

  log(value: { label: string, value: string}): void {
    console.log(this.listOfTagOptions);
  }
}
