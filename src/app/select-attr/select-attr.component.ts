import { Component, OnInit } from '@angular/core';
import {YEARS} from '../constants';

@Component({
  selector: 'app-select-attr',
  templateUrl: './select-attr.component.html',
  styleUrls: ['./select-attr.component.css']
})
export class SelectAttrComponent implements OnInit {

  constructor() { }
  //Radio value: 'variation' / 'statistics'
  radioValue = 'variation';

  //Dropdown
  maxMultipleCount = '6';
  listOfOption = [];
  listOfTagOptions = []; //selected tags


  ngOnInit(): void {
    const children = [];
    YEARS.forEach(year => {
      children.push({ label: year, value: year });
    })
    this.listOfOption = children;
  }

  radioLog(value: string): void {  
    if (this.radioValue === 'statistics') {
      this.maxMultipleCount = '1';
    } else {
      this.maxMultipleCount = '6';
    }
    console.log(this.maxMultipleCount);
  }

  selectLog(value: { label: string, value: string}): void {
    console.log(this.listOfTagOptions);
  }
}
