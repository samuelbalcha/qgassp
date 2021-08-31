import { Component, OnInit } from '@angular/core';

export interface TableElement {
  EnergyUse: string;
  Electricity: number;
  Gas: number;
  Oil: number;
  Coal: number;
  Peat: number;
  Wood: number;
  Renewable: number;
  Heat: number;
  Total: number;
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
    Gas: 1.0079, Oil: 12546, Coal: 12345, Peat: 1234,
    Wood: 123455, Renewable: 1234, Heat: 1232344
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
    'Peat', 'Wood', 'Renewable', 'Heat', 'Total'];


  dataSource = this.constactTableDate();
  totalDuration: any;
  constructor() { }


  getTotalElectricity() {
    return this.dataSource.map(t => t.Electricity).reduce((acc, value) => acc + value, 0);
  }
  getTotalGas() {
    return this.dataSource.map(t => t.Gas).reduce((acc, value) => acc + value, 0);
  }
  getTotalOil() {
    return this.dataSource.map(t => t.Gas).reduce((acc, value) => acc + value, 0);
  }
  getTotalCoal() {
    return this.dataSource.map(t => t.Gas).reduce((acc, value) => acc + value, 0);
  }
  getTotalPeat() {
    return this.dataSource.map(t => t.Gas).reduce((acc, value) => acc + value, 0);
  }
  getTotalWood() {
    return this.dataSource.map(t => t.Gas).reduce((acc, value) => acc + value, 0);
  }
  getTotalHeat() {
    return this.dataSource.map(t => t.Gas).reduce((acc, value) => acc + value, 0);
  }
  getTotalTotal(i: any) {
    console.log(i)
    return this.dataSource.map(t => t.Total).reduce((acc, value) => acc + value, 0);
  }
  gettotalAll() {
    var sum = 0;

    sum = sum +
      this.getTotalElectricity() +
      this.getTotalGas() +
      this.getTotalOil() +
      this.getTotalCoal() +
      this.getTotalPeat() +
      this.getTotalWood() +
      this.getTotalHeat() +
      this.getTotalGas();
    return sum;
  }
  constactTableDate() {
    var tableData = [];

    for (let i = 0; i < ELEMENT_DATA.length; i++) {
      var sum = 0;
      var obj: { [k: string]: any } = ELEMENT_DATA[i];
      sum = sum + ELEMENT_DATA[i].Electricity +
        ELEMENT_DATA[i].Gas +
        ELEMENT_DATA[i].Oil +
        ELEMENT_DATA[i].Coal +
        ELEMENT_DATA[i].Peat +
        ELEMENT_DATA[i].Wood +
        ELEMENT_DATA[i].Heat

      obj.Total = sum

      tableData.push(obj);
    }
    return tableData
  }
  ngOnInit(): void {
    this.constactTableDate();
  }


}
