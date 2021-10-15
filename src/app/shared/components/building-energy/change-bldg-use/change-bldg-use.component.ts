import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'change-bldg-use',
  templateUrl: './change-bldg-use.component.html',
  styleUrls: ['./../building-energy.component.scss']
})
export class ChangeBldgUseComponent implements OnInit {
  public residetial = [
    { name: 'Apartments', value: 0 },
    { name: 'Terrace', value: 1 },
    { name: 'Semi-detached', value: 1 },
    { name: 'Detached', value: 1 },
  ]
  public commercial = [
    { name: 'Health', value: 0 },
    { name: 'Hospital', value: 1 },
    { name: 'Semi-detached', value: 1 },
    { name: 'Detached', value: 1 },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
