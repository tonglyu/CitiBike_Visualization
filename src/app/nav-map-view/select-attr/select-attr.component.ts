import { Component, OnInit } from '@angular/core';
import {YEARS} from '../constants';
import { MapService } from "../map.service";

@Component({
  selector: 'app-select-attr',
  templateUrl: './select-attr.component.html',
  styleUrls: ['./select-attr.component.css']
})
export class SelectAttrComponent implements OnInit {

  constructor(private mapService: MapService) { }
  //Radio value: 'variation' / 'statistics'
  radioValue = 'statistics';

  //Dropdown
  maxMultipleCount = '1';
  listOfOption = [];
  listOfTagOptions = []; // selected tags


  ngOnInit(): void {
    const children = [];
    YEARS.forEach(year => {
      children.push({ label: year, value: year});
    })
    this.listOfOption = children;
  }

  radioLog(value: string): void {  
    if (this.radioValue === 'statistics') {
      this.maxMultipleCount = '1';
      this.listOfTagOptions = [];
    } else {
      this.maxMultipleCount = '6';
      this.listOfTagOptions = [];
    }
  }

  selectLog(value: { label: string, value: string}): void {
    this.mapService.changeYears(this.listOfTagOptions);
  }
  
}
