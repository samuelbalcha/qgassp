import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

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
    Gas: 1, Oil: 2, Coal: 12345, Peat: 1234,
    Wood: 123455,
    Renewable: 1234,
    Heat: 1232344
  },
  {
    EnergyUse: 'Terrace', Electricity: 124578933,
    Gas: 1, Oil: 2, Coal: 12345,
    Peat: 1234, Wood: 123455, Renewable: 1234,
    Heat: 1232344
  },
  {
    EnergyUse: 'Semi-detached', Electricity: 124578933,
    Gas: 2, Oil: 2, Coal: 12345, Peat: 1234,
    Wood: 123455, Renewable: 1234, Heat: 1232344
  },
  {
    EnergyUse: 'Detached', Electricity: 1,
    Gas: 1, Oil: 1, Coal: 1, Peat: 1,
    Wood: 1, Renewable: 1, Heat: 1
  },

];

@Component({
  selector: 'building-energy-result',
  templateUrl: './building-energy-result.component.html',
  styleUrls: ['./building-energy-result.component.scss']
})
export class BuildingEnergyResultComponent implements OnInit {

  displayedColumns: string[] = ['EnergyUse', 'Electricity',
    'Gas', 'Oil', 'Coal', 'Peat', 'Wood', 'Renewable', 'Heat', 'Total'];


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
    return this.dataSource.map(t => t.Oil).reduce((acc, value) => acc + value, 0);
  }
  getTotalCoal() {
    return this.dataSource.map(t => t.Coal).reduce((acc, value) => acc + value, 0);
  }
  getTotalPeat() {
    return this.dataSource.map(t => t.Peat).reduce((acc, value) => acc + value, 0);
  }
  getTotalWood() {
    return this.dataSource.map(t => t.Wood).reduce((acc, value) => acc + value, 0);
  }
  getTotalHeat() {
    return this.dataSource.map(t => t.Heat).reduce((acc, value) => acc + value, 0);
  }
  getTotalAll() {
    return this.dataSource.map(t => t.Total).reduce((acc, value) => acc + value, 0);
  }
  getTotalTotal(i: any) {
    var sum = 0;
    sum = sum + this.dataSource[i].Electricity +
      this.dataSource[i].Gas +
      this.dataSource[i].Oil +
      this.dataSource[i].Coal +
      this.dataSource[i].Peat +
      this.dataSource[i].Wood +
      this.dataSource[i].Heat

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
    console.log(tableData)
    return tableData
  }

  public pieChartOptions: ChartOptions = {
    responsive: false,
    legend: {
      display: true,
      labels: {
        fontSize: 15,
        fontColor: 'rgb(4,7,31)',
      }
    }
  };
  public pieChartLabels: Label[] = [['Coal'], ['Peat'], ['Wood'], ['Electricity'], ['gas'], ['Oil']];
  // public pieChartColors: Color[] = [
  //   { backgroundColor: 'rgb(4,7,31)', borderColor: "white" },
  //   { backgroundColor: "rgb(0,9,73)", borderColor: "white" },
  //   { backgroundColor: "rgb(52,94,141)", borderColor: "white" },
  //   { backgroundColor: "rgb(78,115,190)", borderColor: "white" },
  //   { backgroundColor: "rgb(165,165,165)", borderColor: "white" },
  //   { backgroundColor: "rgb(106,154,208)", borderColor: "white" },
  // ];
  public pieChartData: SingleDataSet = [0.33, 0.09, 3, 26, 25, 46];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [

  ];
  // barChartOptions: any = {
  //   responsive: false,
  //   aspectRatio: 1,
  //   scales: {
  //     xAxes: [
  //       {
  //         gridLines: {
  //           display: false,
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         gridLines: {
  //           display: false,
  //         },
  //       },
  //     ],
  //   },
  // };
  // barChartLabels: Label[] = [
  //   '1',
  //   '2',
  //   '3',
  //   '4',
  //   '5',
  //   '6',
  //   '7',
  //   '8',
  //   '9',
  // ];
  // barChartType: ChartType = 'bar';
  // barChartLegend = true;
  // barChartPlugins = [];

  // barChartData: ChartDataSets[] = [
  //   {
  //     data: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000],
  //     label: '1.Version',
  //     barThickness: 8,
  //     backgroundColor: '#214E9C',
  //   },
  //   {
  //     data: [1000, 1200, 1500, 2200, 6000, 1000, 500, 1700, 1000],
  //     label: '2.Version',
  //     barThickness: 8,
  //     backgroundColor: '#6BAD2B',
  //   },
  // ];

  ngOnInit(): void {
    this.constactTableDate();
  }


}
