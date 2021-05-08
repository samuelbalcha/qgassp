import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'emission-factors',
  templateUrl: './emission-factors.component.html',
  styleUrls: ['./emission-factors.component.scss'],
})
export class EmissionFactorsComponent implements OnInit {
  public dataSource = [
    {
      transformation: 'Grassland to Settlements',
      aboveGround: 52.91,
      belowGround: 11.67,
      deadWood: 0.8,
      litter: 11,
      mineral: 1.07,
      organic: -7.9,
    },
  ];

  mainColumns: string[] = [
    'Emission factors* t C/ha yr',
    'Biomass',
    'Dead organic matter',
    'Soil',
  ];

  displayedColumns: string[] = [
    'Transformation',
    'Aboveground',
    'Belowground',
    'Deadwood',
    'Litter',
    'Mineral',
    'Organic',
  ];

  constructor() {}

  ngOnInit() {}
}
