import { Component, OnInit } from '@angular/core';


import * as d3 from 'd3';
import * as zoom from 'd3-zoom';
import {ZoomScale} from "d3-zoom"
import { ArrayLike, select, Selection, event } from 'd3-selection';
import { Transition } from 'd3-transition';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { interpolateZoom, interpolate, interpolateArray, ZoomInterpolator, ZoomView } from 'd3-interpolate';

@Component({
  selector: 'app-nav-analysis-view',
  templateUrl: './nav-analysis-view.component.html',
  styleUrls: ['./nav-analysis-view.component.css']
})
export class NavAnalysisViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    







  }

}
