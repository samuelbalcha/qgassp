import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss']
})
export class TrafficComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  intensity = [
    { type: 'Not available', value: 0 },
    { type: 'Very Low', value: 0.25 },
    { type: 'Low', value: 0.5 },
    { type: 'Equal to national avarage', value: 1 },
    { type: 'High', value: 2 },
    { type: 'Very High', value: 4 }
  ]
  displayedColumns: string[] = ['type', 'value']
  dataSource = [
    { type: 'Not available', value: 0.00 },
    { type: 'Very low', value: 0.20 },
    { type: 'Low', value: 0.50 },
    { type: 'Equal to national avarage', value: 1.00 },
    { type: 'High', value: 1.25 },
    { type: 'Very high', value: 2.00 },
  ]

}
