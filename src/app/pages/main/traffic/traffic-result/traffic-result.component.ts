import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import _ from 'lodash';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'traffic-result',
  templateUrl: './traffic-result.component.html',
  styleUrls: ['./traffic-result.component.scss']
})
export class TrafficResultComponent implements OnInit {
  tableDatasource: any[] = [];
  dataSorce = [
    { source: 'Motor coaches, buses and trolly busses', value: 321 },
    { source: 'Passanger cars', value: 17868 },
    { source: 'Tram and metro', value: 43 },
    { source: 'Passanger trains', value: 81 },
    { source: 'Rail Freight', value: 1023 },
    { source: 'Road Freight', value: 529 },
    { source: 'Inland waterway freight', value: 1 },
  ];

  displayedColumns: string[] = ['year', 'busses', 'cars', 'trams', 'trains', 'rail', 'road', 'inland']
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = _.map(this.dataSorce, 'source');
  public pieChartData: SingleDataSet = _.map(this.dataSorce, 'value');
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  lineChartData: ChartDataSets[] = []
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'yellow',
      backgroundColor: 'yellow',
    },
    {
      borderColor: '#DF8244',
      backgroundColor: '#DF8244',
    },
    {
      borderColor: '#CCCCCC',
      backgroundColor: '#CCCCCC',
    },
    {
      borderColor: '#F6C142',
      backgroundColor: '#F6C142',
    },
    {
      borderColor: '#B85F29',
      backgroundColor: '#B85F29',
    },
    {
      borderColor: '#F6C142',
      backgroundColor: '#F6C142',
    },
    {
      borderColor: '#345E8D',
      backgroundColor: '#345E8D',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';



  constructor() { }

  ngOnInit(): void {

    for (let i = 2021; i < 2051; i++) {
      let row = {
        year: i,
        busses: 322,
        cars: Math.floor(Math.random() * (17900 - 17480 + 1)) + 17480,
        trams: 43,
        trains: 81,
        rail: 7630,
        road: 536,
        inland: 1

      }
      this.tableDatasource.push(row);
    }
    if (this.tableDatasource) {
      this.lineChartData = [
        {
          data: _.map(this.tableDatasource, 'busses'), label: 'Motor coaches and trolly busses'
        },
        {
          data: _.map(this.tableDatasource, 'cars'), label: 'Passanger cars'
        },
        {
          data: _.map(this.tableDatasource, 'trams'), label: 'Tram and metro'
        },
        {
          data: _.map(this.tableDatasource, 'trains'), label: 'Passanger trains'
        },
        {
          data: _.map(this.tableDatasource, 'rail'), label: 'Rail freight'
        },
        {
          data: _.map(this.tableDatasource, 'road'), label: 'Road freight'
        },
        {
          data: _.map(this.tableDatasource, 'inland'), label: 'Inland waterways freight'
        }
      ];
      this.lineChartLabels = _.map(this.tableDatasource, 'year');
      console.log('this.tableDatasource');
      console.log(this.tableDatasource)
    }

  }


}

