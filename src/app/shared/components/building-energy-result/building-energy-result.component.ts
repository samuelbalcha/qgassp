import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  EnergyUse: string;
  Electricity: number;
  Gas: number;
  Oil: number;
  Coal: number;
  Peat: number;
  Wood: number;
  Renewable: number;
  Heat: number;
}

const ELEMENT_DATA = [
  {
    EnergyUse: 'Appartments', Electricity: 124578933,
    Gas: 1.0079, Oil: 12546, Coal: 12345, Peat: 1234,
    Wood: 123455,
    Renewable: 1234,
    Heat: 1232344
  },
  {
    EnergyUse: 'Terrace', Electricity: 124578933,
    Gas: 1.0079, Oil: 12546, Coal: 12345,
    Peat: 1234, Wood: 123455, Renewable: 1234,
    Heat: 1232344
  },
  {
    EnergyUse: 'Semi-detached', Electricity: 124578933,
    gas: 1.0079, oil: 12546, coal: 12345, peat: 1234,
    wood: 123455, renewable: 1234, heat: 1232344
  },
  {
    EnergyUse: 'Detached', Electricity: 124578933,
    Gas: 1.0079, Oil: 12546, Coal: 12345, Peat: 1234,
    Wood: 123455, Renewable: 1234, Heat: 1232344
  },

];

@Component({
  selector: 'building-energy-result',
  templateUrl: './building-energy-result.component.html',
  styleUrls: ['./building-energy-result.component.scss']
})
export class BuildingEnergyResultComponent implements OnInit {
  displayedColumns: string[] = ['EnergyUse', 'Electricity',
    'Gas', 'Oil', 'Coal',
    'Peat', 'Wood', 'Renewable', 'Heat'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }


}
