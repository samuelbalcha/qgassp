import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'results-step',
  templateUrl: './results-step.component.html',
  styleUrls: ['./../steps.scss'],
})
export class ResultsStepComponent implements OnInit {
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
    '-',
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
