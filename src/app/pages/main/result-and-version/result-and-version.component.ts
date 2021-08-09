import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'result-and-version',
  templateUrl: './result-and-version.component.html',
  styleUrls: ['./result-and-version.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultAndVersionComponent implements OnInit {
  public myProject = {
    name: "test Project",
    location: "Kymenlaakso, Finland",
    year: "2020",
    owner: "test",
  }
  landuse = true;
  trafic = false;
  buildings = false;
  consumption = false;
  constructor() { }

  getSelected(newItem: any) {
    if (newItem.name == 'landuse') { this.landuse = newItem.value; }
    if (newItem.name == 'trafic') { this.trafic = newItem.value; }
    if (newItem.name == 'buildings') { this.buildings = newItem.value; }
    if (newItem.name == 'consumption') { this.consumption = newItem.value; }
  }
  @Input() backgroundColor: ThemePalette

  ngOnInit(): void {
  }

}
