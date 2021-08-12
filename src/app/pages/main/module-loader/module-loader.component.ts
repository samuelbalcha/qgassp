import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'module-loader',
  templateUrl: './module-loader.component.html',
  styleUrls: ['./module-loader.component.scss']
})

export class ModuleLoaderComponent implements OnInit {
  public myProject = {
    name: "test Project",
    location: "Kymenlaakso, Finland",
    year: "2020",
    owner: "test",
  }
  landuse = false;
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
  ngOnInit(): void { }

}
